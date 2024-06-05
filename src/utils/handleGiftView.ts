import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { createGiftCode, deleteGiftCode, getAllGift, updateGiftCode } from './api';
import { resetDataGiftCode, setDataGiftCode, setGiftCodeEdit } from '@/lib/redux/app/gifCode.slice';
import { StatusGiftCode } from '@/constants';
import moment from 'moment';
import { setLoadingApp } from '@/lib/redux/system/settingSys';

export const useGiftCode = () => {
  const { isInitData, limit, page, giftCode, total, sort, typeSort, giftCodeIdEdit, status, userIdUse } = useAppSelector((state) => state.gifCode);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));
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
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isInitData, limit, page]);

  return {
    data: giftCode.map((item) => {
      return {
        id: item.id,
        userCreate: item.userCreate.username,
        name: item.name,
        code: item.code.slice(0, 3) + '****' + item.code.slice(-3),
        point: item.point,
        process: item.status == StatusGiftCode.Created ? 'Đã tạo' : item.status == StatusGiftCode.Disable ? 'Đã vô hiệu hóa' : 'Đã xử dụng',
        userUse: item?.userUse?.username,
        timeUse: moment(item.timeUse).format('YYYY: HH:mm:ss'),
        createdAt: moment(item.createdAt).format('YYYY: HH:mm:ss'),
      };
    }),
    dataBeforeHandle: giftCode,
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

export const handleCreateGiftCode = async (data: any, dispatch: any) => {
  const res = await createGiftCode(data);
  if (res.data) {
    dispatch(resetDataGiftCode());
  }
};

export const handleDeleteGiftCode = async (id: number, dispatch: any) => {
  const res = await deleteGiftCode(id);
  if (res.data) {
    dispatch(resetDataGiftCode());
  }
};
