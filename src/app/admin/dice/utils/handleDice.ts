import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllGameDice, updateDiceGame as updateDiceGameById } from './api';
import { resetDataDiceGame, setDataDiceGame } from '@/lib/redux/app/diceGame.slice';
import { TypeGameDice } from '@/constants';

export const useDiceGame = () => {
  const { isInitData, limit, page, diceGame, search, total, sort, typeSort } = useAppSelector((state) => state.diceGame);

  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllGameDice(limit, page, sort, typeSort);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataDiceGame({
              data,
              ...pagination,
            }),
          );
        }
      }
    }

    fetchData();
  }, [isInitData, limit, page, search]);

  const dataDiceAfter = diceGame.map((dice) => {
    let typeGameText = 'Xóc đĩa';
    switch (dice.type) {
      case TypeGameDice.ChanLe:
        typeGameText = 'Chẵn lẻ';
        break;
      case TypeGameDice.Blockchain:
        typeGameText = 'Block Chain';
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
    };
  });

  return {
    data: dataDiceAfter,
    pagination: { limit, page, total },
  };
};

export const updateDiceGame = async (id: number, data: any, dispatch: any) => {
  const res = await updateDiceGameById(id, data);
  if (res) {
    dispatch(resetDataDiceGame());
  } else {
    alert('Có lỗi xảy ra vui lòng thử lại sau');
  }
};
