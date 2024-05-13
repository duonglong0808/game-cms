import { BaseAxios } from '@/lib';

export const getAllUser = (search: string, page: number, limit: number) => {
  const axios = new BaseAxios();
  return axios.get(`/user?search=${search}&page=${page}&limit=${limit}`);
};

export const updateUser = (userId: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`/user/cms/${userId}`, data);
};
