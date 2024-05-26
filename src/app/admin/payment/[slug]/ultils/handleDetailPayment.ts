import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { addBankToPayment, createBank, deleteBankPayment, getAllBankPayment, getAllPayment, updateBank } from './api';
import { setDataPayment, setDataPaymentBanks } from '@/lib/redux/app/payment.slice';
import { dataBankStatics } from '@/constants';

export const usePaymentBank = (paymentId: number) => {
  const { banks, isInitDataBank } = useAppSelector((state) => state.payment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitDataBank) {
        const res = await getAllBankPayment(paymentId);
        if (res?.data) {
          dispatch(
            setDataPaymentBanks({
              data: res.data,
              isInitDataBank: true,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitDataBank]);

  return {
    data: banks || [],
  };
};

export const handleDeleteBankPayment = async (paymentId: number, bankId: number, dispatch: any) => {
  const resDeleteBank = await deleteBankPayment(paymentId, bankId);
  // console.log('🚀 ~ handleDeleteBankPayment ~ resDeleteBank:', resDeleteBank);
  if (resDeleteBank) {
    dispatch(
      setDataPaymentBanks({
        isInitDataBank: false,
      }),
    );
  }
};

export const usePayment = (paymentTypeId: number) => {
  const { isInitData, limit, page, payment, search, total } = useAppSelector((state) => state.payment);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllPayment(search, paymentTypeId, page, limit);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataPayment({
              data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page, search]);

  return {
    data: payment.map((item) => {
      return {
        ...item,
        showAccount: item.showAccount ? 'Hiện thông tin' : 'Ẩn thông tin',
      };
    }),
    pagination: { limit, page, total },
  };
};

export const handleAddBankToPayment = async (paymentId: number, data: any, dispatch: any) => {
  const binBank = data?.binBank;
  const createBankDto = {
    ...data,
    nameBank: dataBankStatics.find((bank) => bank.bin == binBank)?.name,
  };
  const resBank = await createBank(createBankDto);
  if (resBank?.data) {
    const bankId = resBank?.data?.id;
    const resAddBank = await addBankToPayment(paymentId, bankId);
    if (resAddBank) {
      dispatch(
        setDataPaymentBanks({
          isInitDataBank: false,
        }),
      );
    }
  } else {
    alert('Có lỗi xảy ra, thử lại sau ít phút');
  }
};

export const updateBankPayment = async (id: number, data: any, dispatch: any) => {
  const nameBank = dataBankStatics.find((i) => i.bin == data?.binBank)?.name;
  const req = await updateBank(id, { ...data, nameBank });
  if (req.data) {
    dispatch(
      setDataPaymentBanks({
        isInitDataBank: false,
      }),
    );
  }
};
