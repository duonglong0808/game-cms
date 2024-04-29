import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPaymentTransactions, updateStatusTransaction } from './api';
import { resetDataPaymentTransaction, setDataPaymentTransaction } from '@/lib/redux/app/paymentTransaction.slice';
import { StatusPaymentTranSaction } from '@/constants';
import { formatDateTime } from '@/share';

export const usePaymentTransaction = () => {
  const { isInitData, limit, page, paymentTransaction, search, total, type, status, sort, typeSort } = useAppSelector((state) => state.paymentTransaction);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const typeRef = useRef(type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current || type != typeRef.current) {
        const res = await getAllPaymentTransactions(limit, page, type, status, sort, typeSort);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          typeRef.current = type;
          dispatch(
            setDataPaymentTransaction({
              data: data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page, search, isInitData, type]);

  const dataAfterHandle = paymentTransaction.map((item: any) => {
    let statusText = '';
    switch (item.status) {
      case StatusPaymentTranSaction.processing:
        statusText = 'Chờ xử lý';
        break;
      case StatusPaymentTranSaction.success:
        statusText = 'Thành công';
        break;
      case StatusPaymentTranSaction.cancel:
        statusText = 'Hủy bỏ';
        break;
      default:
        break;
    }

    return {
      id: item.id,
      userTransfer: item.user.username,
      bankTransfer: item.bankTransfer?.nameBank,
      accountTransfer: item.bankTransfer?.accountOwner,
      bankReceive: item.bankReceive.nameBank,
      accountReceive: item.bankReceive.accountOwner,
      statusText: statusText,
      amount: item.point,
      createdAt: formatDateTime(item.createdAt),
    };
  });

  return {
    data: dataAfterHandle,
    pagination: { limit, page, total },
  };
};

export const handleUpdateStatusPaymentTransaction = async (id: number, data: any, dispatch: any) => {
  const res = await updateStatusTransaction(id, data);
  if (res) {
    dispatch(resetDataPaymentTransaction());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
