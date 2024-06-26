import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPaymentTransactions, getPaymentTransactionsBrief, updateStatusTransaction } from './api';
import { resetDataPaymentTransaction, setDataBriefPaymentTransaction, setDataPaymentTransaction } from '@/lib/redux/app/paymentTransaction.slice';
import { StatusPaymentTranSaction, TypePaymentTranSaction, dataBankStatics } from '@/constants';
import { formatDateTime } from '@/share';
import { setLoadingApp } from '@/lib/redux/system/settingSys';

export const usePaymentTransaction = (userId: string | null) => {
  const { isInitData, limit, page, paymentTransaction, total, type, status, sort, typeSort, dateFrom, dateTo, submitRangerDate } = useAppSelector((state) => state.paymentTransaction);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const userRef = useRef(userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || submitRangerDate || limit != limitRef.current || page != pageRef.current || userId != userRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        userRef.current = userId;
        const res = await getAllPaymentTransactions(limit, page, type, status, dateFrom, dateTo, userId, sort, typeSort);
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
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isInitData, limit, page, submitRangerDate, userId]);

  const dataAfterHandle = paymentTransaction.map((item) => {
    return {
      id: item.id,
      type: item.type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền',
      userTrans: item.user.username,
      bankTrans: dataBankStatics.find((i) => +i.bin == item.bankTransfer?.binBank)?.shortName || '',
      accountTrans: item.bankTransfer?.accountOwner || '',
      accountNumberTrans: item.bankTransfer?.accountNumber || '',
      bankReceive: dataBankStatics.find((i) => +i.bin == item.bankReceive?.binBank)?.shortName || '',
      accountReceive: item?.bankReceive?.accountOwner || '',
      accountNumberReceive: item.bankReceive?.accountNumber || '',
      statusText: item.status,
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

export const useDataTotalDepositAndWithdraw = (userId: string | null) => {
  const { dateFrom, dateTo, submitRangerDate, dataBrief } = useAppSelector((state) => state.paymentTransaction);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (submitRangerDate) {
        const res = await getPaymentTransactionsBrief(dateFrom, dateTo, userId);
        if (res?.data) {
          const { data } = res.data;

          dispatch(
            setDataBriefPaymentTransaction({
              deposit: data?.find((i: any) => i.type == TypePaymentTranSaction.deposit)?.totalPoints * 1000 || 0,
              withdraw: data?.find((i: any) => i.type == TypePaymentTranSaction.withdrawMoney)?.totalPoints * 1000 || 0,
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
