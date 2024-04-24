import { BaseAxios } from '@/lib';

export const getAllPayment = (search: string, paymentTypeId: number, page: number, limit: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment?search=${search}&page=${page}&limit=${limit}&paymentTypeId=${paymentTypeId}`);
};
