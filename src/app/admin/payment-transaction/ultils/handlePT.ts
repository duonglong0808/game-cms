import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPaymentTransactions, getPaymentTransactionsBrief, updateStatusTransaction } from './api';
import { resetDataPaymentTransaction, setDataBriefPaymentTransaction, setDataPaymentTransaction } from '@/lib/redux/app/paymentTransaction.slice';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from '@/constants';
import { formatDateTime } from '@/share';

export const usePaymentTransaction = () => {
  const { isInitData, limit, page, paymentTransaction, total, type, status, sort, typeSort, dateFrom, dateTo, submitRangerDate } = useAppSelector((state) => state.paymentTransaction);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || submitRangerDate || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllPaymentTransactions(limit, page, type, status, dateFrom, dateTo, sort, typeSort);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
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
  }, [isInitData, limit, page, submitRangerDate]);

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
      image: item?.receipt,
      createdAt: formatDateTime(item.createdAt),
    };
  });

  return {
    data: dataAfterHandle,
    pagination: { limit, page, total },
  };
};

export const useDataTotalDepositAndWithdraw = () => {
  const { dateFrom, dateTo, submitRangerDate, dataBrief } = useAppSelector((state) => state.paymentTransaction);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (submitRangerDate) {
        const res = await getPaymentTransactionsBrief(dateFrom, dateTo);
        if (res?.data) {
          const { data } = res.data;

          dispatch(
            setDataBriefPaymentTransaction({
              deposit: data?.find((i: any) => i.type == TypePaymentTranSaction.deposit)?.totalPoints || 0,
              withdraw: data?.find((i: any) => i.type == TypePaymentTranSaction.withdrawMoney)?.totalPoints || 0,
            }),
          );
        }
      }
    }

    fetchData();
  }, [submitRangerDate]);

  // return {
  //   deposit:
  //     dataBrief.deposit?.toLocaleString('en-US', {
  //       maximumFractionDigits: 2,
  //       useGrouping: true,
  //     }) || 0,
  //   withdraw:
  //     dataBrief.withdraw?.toLocaleString('en-US', {
  //       maximumFractionDigits: 2,
  //       useGrouping: true,
  //     }) || 0,
  // };
  return dataBrief;
};

export const handleUpdateStatusPaymentTransaction = async (id: number, data: any, dispatch: any) => {
  const res = await updateStatusTransaction(id, data);
  if (res) {
    dispatch(resetDataPaymentTransaction());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
