import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllGift, updateGiftCode } from './api';
import { resetDataGiftCode, setDataGiftCode, setGiftCodeEdit } from '@/lib/redux/app/gifCode.slice';

export const useGiftCode = () => {
  const { isInitData, limit, page, giftCode, total, sort, typeSort, giftCodeIdEdit, status, userIdUse } = useAppSelector((state) => state.gifCode);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllGift(page, limit, status, userIdUse);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataGiftCode({
              data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page]);

  return {
    data: giftCode,
    pagination: { limit, page, total },
    giftCodeIdEdit,
  };
};

export const updateDataGiftCode = async (id: number, data: any, dispatch: any) => {
  const res = await updateGiftCode(id, data);
  if (res.data) {
    dispatch(resetDataGiftCode());
  } else {
    dispatch(setGiftCodeEdit({ id: '' }));
  }
};
