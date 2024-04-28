import { BaseAxios } from '@/lib';

export const getAllDiceDetail = (gameDiceId: number, page: number, limit: number) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);
  return axios.get(`/dice-detail/admin?page=${page}&limit=${limit}&gameDiceId=${gameDiceId}`);
};

export const updateStatusDiceDetail = (deiceDetailId: number) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);
  return axios.patch(`/dice-detail/${deiceDetailId}/status`, {});
};
