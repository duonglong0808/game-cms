import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllDicePlayHistory } from './api';
import { setDataDicePlayHistory } from '@/lib/redux/app/dicePlayHistory.slice';
import moment from 'moment';

export const useDicePlayHistory = () => {
  const { diceDetailId, dicePlayHistory, gameDiceId, isInitData, limit, page, sort, submitted, total, typeSort, userId } = useAppSelector((state) => state.dicePlayHistory);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || submitted || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllDicePlayHistory(limit, page, gameDiceId, diceDetailId, userId, sort, typeSort);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataDicePlayHistory({
              data: data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page, submitted]);

  return {
    data: [...dicePlayHistory].map((item) => {
      const { status, id, createdAt, ...subObject } = item;
      const statusText = item.status == 1 ? 'Đã xử lý' : 'Chờ xử lý';

      return {
        id,
        process: statusText,
        ...subObject,
        timePlay: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      };
    }),
    pagination: { limit, page, total },
  };
};
