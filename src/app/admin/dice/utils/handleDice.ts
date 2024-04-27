import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllGameDice } from './api';
import { setDataDiceGame } from '@/lib/redux/app/diceGame.slice';
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
  }, [limit, page, search]);

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
