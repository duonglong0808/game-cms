import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllPaymentType } from './api';
import { setDataPaymentTypes } from '@/lib/redux/app/paymentType.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';

const usePaymentType = () => {
  const { isInitData, limit, page, paymentTypes, search, total } = useAppSelector((state) => state.paymentTypes);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllPaymentType(search, page, limit);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataPaymentTypes({
              data,
              ...pagination,
            }),
          );
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isInitData, limit, page, search]);

  return {
    data: paymentTypes,
    pagination: { limit, page, total },
  };
};

export { usePaymentType };
