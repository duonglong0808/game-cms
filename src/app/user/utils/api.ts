import { BaseAxios } from '@/lib';

export const getAllUser = (search: string, page: number, limit: number) => {
  const axios = new BaseAxios();
  return axios.get(`/user?search=${search}&page=${page}&limit=${limit}`);
};
