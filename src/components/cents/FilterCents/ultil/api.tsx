import { BaseAxios } from '@/lib';

export const getAllGame = () => {
  const axios = new BaseAxios();

  return axios.get('/game-point?page=1&limit=100');
};
