import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { getAllBaccaratPlayHistory } from './api';
import { setDataBaccaratPlayHistory } from '@/lib/redux/app/baccaratPlayHistory.slice';
import { TypeAnswerBaccarat, TypePlayGameBaccarat } from '@/constants';

export const useBaccaratPlayHistory = () => {
  const { gameBaccaratId, baccaratPlayHistory, baccaratDetailId, isInitData, limit, page, sort, submitted, total, typeSort, userId } = useAppSelector((state) => state.baccaratPlayHistory);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || submitted || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllBaccaratPlayHistory(limit, page, gameBaccaratId, baccaratDetailId, userId);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataBaccaratPlayHistory({
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
    data: [...baccaratPlayHistory].map((item) => {
      const { status, id, createdAt, user, type, answer: answerDB, ...subObject } = item;
      const statusText = item.status == 1 ? 'Đã xử lý' : 'Chờ xử lý';

      let answer = '';
      switch (answerDB) {
        case TypeAnswerBaccarat.p1:
          answer = 'Con đôi';
          break;
        case TypeAnswerBaccarat.p2:
          answer = 'Con long bảo';
          break;
        case TypeAnswerBaccarat.p3:
          answer = 'Hòa';
          break;
        case TypeAnswerBaccarat.p4:
          answer = 'Cái';
          break;
        case TypeAnswerBaccarat.p5:
          answer = 'Con';
          break;
        case TypeAnswerBaccarat.p6:
          answer = 'Super 6';
          break;
        case TypeAnswerBaccarat.p7:
          answer = 'Cái đôi';
          break;
        case TypeAnswerBaccarat.p8:
          answer = 'Cái long bảo';
          break;
        case TypeAnswerBaccarat.p9:
          answer = 'Đôi bất kỳ';
          break;
        case TypeAnswerBaccarat.p10:
          answer = 'Con bài chuẩn';
          break;
        case TypeAnswerBaccarat.p11:
          answer = 'Đôi hoàn mĩ';
          break;
        case TypeAnswerBaccarat.p12:
          answer = 'Cái bài chuẩn';
          break;

        default:
          break;
      }
      return {
        id,
        user: user.username,
        type: type == TypePlayGameBaccarat.all ? 'Ăn đủ' : 'Cổ điển',
        answer,
        process: statusText,
        ...subObject,
        timePlay: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      };
    }),
    pagination: { limit, page, total },
  };
};
