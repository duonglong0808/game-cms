import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPayment } from './api';
import { setDataPaymentTypes } from '@/lib/redux/app/paymentType.slice';

const usePayment = () => {
  const { isInitData, limit, page, payment, search, total } = useAppSelector((state) => state.payment);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllPayment(search, page, limit);
        if (res?.data) {
          const { data, pagination } = res.data;
          dispatch(
            setDataPaymentTypes({
              data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [limit, page, search]);

  return {
    data: payment,
    pagination: { limit, page, total },
  };
};

export { usePayment };
