import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPaymentType } from './api';
import { setDataPaymentTypes } from '@/lib/redux/app/paymentType.slice';

const usePaymentType = () => {
  const { isInitData, limit, page, paymentTypes, search, total } = useAppSelector((state) => state.paymentTypes);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllPaymentType(search, page, limit);
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
    data: paymentTypes,
    pagination: { limit, page, total },
  };
};

export { usePaymentType };
