import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { createDiceDetail, getAllDiceDetail, updateResultDiceDetailById, updateStatusDiceDetail } from './api';
import { resetDataDiceDetail, setDataDiceDetail } from '@/lib/redux/app/diceDetail.slice';
import { StatusDiceDetail } from '@/constants';
import { setLoadingApp } from '@/lib/redux/system/settingSys';

export const useDiceDetail = (diceGameId: number) => {
  const { isInitData, limit, page, diceDetail, search, total } = useAppSelector((state) => state.diceDetail);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));

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
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const handleUpdateStatusPaymentTransaction = async (id: number, data: any, dispatch: any) => {
  const res = data?.totalRed ? await updateResultDiceDetailById(id, data) : await updateStatusDiceDetail(id);
  if (res) {
    dispatch(resetDataDiceDetail());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};

export const handleCreateDiceTransaction = async (id: number, data: any, dispatch: any) => {
  const res = await createDiceDetail({
    gameDiceId: id,
    ...data,
  });
  if (res) {
    dispatch(resetDataDiceDetail());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
