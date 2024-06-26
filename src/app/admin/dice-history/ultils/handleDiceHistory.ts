import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllDicePlayHistory } from './api';
import { setDataDicePlayHistory } from '@/lib/redux/app/dicePlayHistory.slice';
import moment from 'moment';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { TypeAnswerDice } from '@/constants';

export const useDicePlayHistory = () => {
  const { diceDetailId, dicePlayHistory, gameDiceId, isInitData, limit, page, sort, submitted, total, typeSort, userId } = useAppSelector((state) => state.dicePlayHistory);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || submitted || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));
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
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isInitData, limit, page, submitted]);

  return {
    data: [...dicePlayHistory].map((item) => {
      const { status, id, createdAt, user, answer: answerDb, ...subObject } = item;
      const statusText = item.status == 1 ? 'Đã xử lý' : 'Chờ xử lý';

      let answer = '';
      switch (answerDb) {
        case TypeAnswerDice.p1:
          answer = '4 trắng';
          break;
        case TypeAnswerDice.p2:
          answer = '1 đỏ';
          break;
        case TypeAnswerDice.p3:
          answer = '2 đỏ';
          break;
        case TypeAnswerDice.p4:
          answer = 'Chẵn';
          break;
        case TypeAnswerDice.p5:
          answer = 'Xỉu';
          break;
        case TypeAnswerDice.p6:
          answer = 'Lẻ';
          break;
        case TypeAnswerDice.p7:
          answer = 'Tài';
          break;
        case TypeAnswerDice.p8:
          answer = '4 đỏ';
          break;
        case TypeAnswerDice.p9:
          answer = '3 đỏ';
          break;
        case TypeAnswerDice.p10:
          answer = '4 đỏ hoặc 4 trắng';
          break;

        default:
          break;
      }
      return {
        id,
        user: user.username,
        answer,
        process: statusText,
        ...subObject,
        timePlay: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      };
    }),
    pagination: { limit, page, total },
  };
};
