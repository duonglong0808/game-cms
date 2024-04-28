import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllDiceDetail, updateStatusDiceDetail } from './api';
import { resetDataDiceDetail, setDataDiceDetail } from '@/lib/redux/app/diceDetail.slice';
import { StatusDiceDetail } from '@/constants';

export const useDiceDetail = (diceGameId: number) => {
  const { isInitData, limit, page, diceDetail, search, total } = useAppSelector((state) => state.diceDetail);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllDiceDetail(diceGameId, page, limit);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataDiceDetail({
              data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page, search]);

  const dataAfterHandle = diceDetail.map((item) => {
    let statusText = 'Đang chờ';
    switch (item.status) {
      case StatusDiceDetail.shake:
        statusText = 'Xóc đĩa';
        break;
      case StatusDiceDetail.bet:
        statusText = 'Đặt cược';
        break;
      case StatusDiceDetail.waitOpen:
        statusText = 'Chờ mở bát';
        break;
      case StatusDiceDetail.check:
        statusText = 'Kiểm tra kết quả';
        break;
      case StatusDiceDetail.end:
        statusText = 'Đã kết thúc';
        break;

      default:
        break;
    }

    return {
      id: item.id,
      transaction: item.mainTransaction,
      totalRed: item.totalRed,
      dateId: item.dateId,
      statusNow: statusText,
    };
  });

  return {
    data: dataAfterHandle,
    pagination: { limit, page, total },
  };
};

export const handleUpdateStatusPaymentTransaction = async (id: number, data: any, dispatch: any) => {
  const res = await updateStatusDiceDetail(id);
  if (res) {
    dispatch(resetDataDiceDetail());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
