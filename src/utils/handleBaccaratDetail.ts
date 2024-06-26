import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef } from 'react';
import { getAllBaccaratDetail } from './api';
import { setDataBaccaratDetail } from '@/lib/redux/app/baccaratDetail.slice';
import { StatusBaccarat } from '@/constants';

export const useBaccaratDetail = (baccaratGameId: number) => {
  const { isInitData, limit, page, baccaratDetail, search, total } = useAppSelector((state) => state.baccaratDetail);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));

        const res = await getAllBaccaratDetail(baccaratGameId, page, limit);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataBaccaratDetail({
              data,
              ...pagination,
            }),
          );
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitData, limit, page, search]);

  const dataAfterHandle = baccaratDetail.map((item) => {
    let statusText = 'Đang chờ';
    switch (item.status) {
      case StatusBaccarat.bet:
        statusText = 'Đặt cược';
        break;
      case StatusBaccarat.waitOpen:
        statusText = 'Chờ mở bài';
        break;
      case StatusBaccarat.showPoker:
        statusText = 'Đang mở bài';
        break;
      case StatusBaccarat.check:
        statusText = 'Kiểm tra kết quả';
        break;
      case StatusBaccarat.end:
        statusText = 'Đã kết thúc';
        break;

      default:
        break;
    }

    return {
      id: item.id,
      transaction: item.mainTransaction,
      pokerPlayer: item.pokerPlayer && JSON.parse(item.pokerPlayer).join(', '),
      pokerBanker: item.pokerBanker && JSON.parse(item.pokerBanker).join(', '),
      pointPlayer: item.pointPlayer,
      pointBanker: item.pointBanker,
      dateId: item.dateId,
      statusNow: statusText,
      totalBet: (item.totalBet * 1000).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        useGrouping: true,
      }),
      totalReward: (item.totalReward * 1000).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        useGrouping: true,
      }),
    };
  });

  return {
    data: dataAfterHandle,
    pagination: { limit, page, total },
  };
};
