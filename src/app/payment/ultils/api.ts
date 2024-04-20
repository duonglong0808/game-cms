import { BaseAxios } from '@/lib';

export const getAllPaymentType = (search: string, page: number, limit: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment-type?search=${search}&page=${page}&limit=${limit}`);
};
