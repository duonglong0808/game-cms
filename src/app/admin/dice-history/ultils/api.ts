import { BaseAxios } from '@/lib';

export const getAllDicePlayHistory = (limit: number, page: number, gameDiceId?: number, diceDetailId?: number, userId?: number, sort?: string, typeSort?: string) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);

  let url = `/history-play?limit=${limit}&page=${page}`;
  if (gameDiceId) url += `&gameDiceId=${gameDiceId}`;
  if (diceDetailId) url += `&diceDetailId=${diceDetailId}`;
  if (userId) url += `&userId=${userId}`;
  if (sort) url += `&sort=${sort}`;
  if (typeSort) url += `&typeSort=${typeSort}`;

  return axios.get(url);
};
