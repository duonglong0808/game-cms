import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef } from 'react';
import { getAllHistoryUserTransferPoint, getAllPointUser } from './api';
import { setDataHistoryTransferPoint, setDataUserPoint } from '@/lib/redux/app/pointUser.slice';
import moment from 'moment';

export const useDataAndHistoryPoint = (userId: string | null) => {
  const { userPoint, dateFrom, dateTo, limit, page, isInitData, typeSearch, total, historyTransferPoint } = useAppSelector((state) => state.userPoint);
  console.log('🚀 ~ useDataAndHistoryPoint ~ typeSearch:', typeSearch);
  const dispatch = useAppDispatch();
  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const userRef = useRef(userId);

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current || userId != userRef.current) {
        console.log('Fetching data');
        dispatch(setLoadingApp({ loading: true }));
        userRef.current = userId;
        const res = typeSearch == 'point' ? await getAllPointUser(page, limit, userId) : await getAllHistoryUserTransferPoint(page, limit, dateFrom, dateTo, userId);
        if (res?.data) {
          const { data, pagination } = res.data;
          console.log('🚀 ~ fetchData ~ data:', data);
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            typeSearch == 'point'
              ? setDataUserPoint({
                  data: data,
                  ...pagination,
                })
              : setDataHistoryTransferPoint({
                  data: data,
                  ...pagination,
                }),
          );
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [limit, page, isInitData, userId]);

  return {
    data:
      typeSearch == 'point'
        ? userPoint.map((item) => {
            return {
              id: item.id,
              name: item.user.name,
              game: item.gamePoint.name,
              point: String(item.points),
            };
          })
        : historyTransferPoint.map((item) => {
            return {
              gameTransfer: item.gameTransfer?.name,
              gameReceiver: item.gameReceiver?.name,
              pointTransfer: item.pointTrans,
              pointSurplus: item.surplus,
              content: item.description || 'Chuyển tiền thường',
              timeTransaction: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            };
          }),
    pagination: { limit, page, total },
  };
};
