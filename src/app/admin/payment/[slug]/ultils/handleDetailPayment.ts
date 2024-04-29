import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPayment } from './api';
import { setDataPayment } from '@/lib/redux/app/payment.slice';

const usePayment = (paymentTypeId: number) => {
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
    data: payment,
    pagination: { limit, page, total },
  };
};

export { usePayment };
