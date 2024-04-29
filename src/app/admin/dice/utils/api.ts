import { BaseAxios } from '@/lib';

export const getAllGameDice = (limit: number, page: number, sort?: string, typeSort?: string) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);

  let url = `/dice?limit=${limit}&page=${page}`;

  // Kiểm tra và thêm các tham số chỉ khi chúng khác null hoặc undefined
  if (sort) {
    url += `&sort=${sort}`;
  }
  if (typeSort) {
    url += `&typeSort=${typeSort}`;
  }
  return axios.get(url);
};

export const updateDiceGameById = (id: number, data: any) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);
  return axios.patch(`/dice/${id}`, data);
};
