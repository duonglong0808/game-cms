import { BaseAxios } from '@/lib';

export const getAllPaymentTransactions = (limit: number, page: number, type: number, status: number, sort?: string, typeSort?: string) => {
  const axios = new BaseAxios();
  const allData = axios.get(`/payment-transaction?limit=${limit}&page=${page}&type=${type}&status=${status}&sort=${sort}&typeSort=${typeSort}`);
};
