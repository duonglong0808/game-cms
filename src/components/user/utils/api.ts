import { BaseAxios } from '@/lib';

export const getAllUser = (search: string, page: number, limit: number, phone: string) => {
  const axios = new BaseAxios();
  return axios.get(`/user?search=${search}&page=${page}&limit=${limit}&phone=${phone}`);
};

export const updateUser = (userId: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`/user/cms/${userId}`, data);
};

export const getBankByUserId = (userId: number) => {
  const axios = new BaseAxios();
  return axios.get(`/bank/cms?userId=${userId}&page=${1}&limit=${10}`);
};

export const updateBank = (id: number, data: object) => {
  const axios = new BaseAxios();
  return axios.patch(`/bank/${id}`, data);
};
