import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect, useRef } from 'react';
import { createBaccaratGameById, getAllGameBaccarat, updateBaccaratGameById } from './api';
import { resetDataBaccaratGame, setDataBaccaratGame } from '@/lib/redux/app/baccaratGame.slice';
import { TypeGameBaccarat } from '@/constants';

export const useBaccaratGame = () => {
  const { isInitData, limit, page, baccaratGame, search, total, sort, typeSort } = useAppSelector((state) => state.baccaratGame);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllGameBaccarat(limit, page, sort, typeSort);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataBaccaratGame({
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

  const dataDiceAfter = baccaratGame.map((dice) => {
    let typeGameText = 'MC Baccarat';
    switch (dice.type) {
      case TypeGameBaccarat.flash:
        typeGameText = 'Baccarat tốc độ';
        break;
      case TypeGameBaccarat.mi:
        typeGameText = 'Mi baccarat';
        break;
      default:
        break;
    }

    return {
      id: dice.id,
      name: dice.name,
      type: typeGameText,
      nameAuth: dice.nameAuthor,
      national: dice.nationalAuthor,
      image: dice.avtAuthor,
      idLive: dice.idLive,
      idLiveMobile: dice.idLiveMobile,
    };
  });

  return {
    data: dataDiceAfter,
    pagination: { limit, page, total },
  };
};

export const updateBaccaratGame = async (id: number, data: any, dispatch: any) => {
  const res = await updateBaccaratGameById(id, data);
  if (res) {
    dispatch(resetDataBaccaratGame());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};

export const createdBaccaratGame = async (data: any, dispatch: any) => {
  const res = await createBaccaratGameById(data);
  if (res?.data) {
    dispatch(resetDataBaccaratGame());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
