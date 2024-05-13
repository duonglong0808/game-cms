import { BaseAxios } from '@/lib';

export const getAllPayment = (search: string, paymentTypeId: number, page: number, limit: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment?search=${search}&page=${page}&limit=${limit}&paymentTypeId=${paymentTypeId}`);
};

export const getAllBankPayment = (paymentId: number) => {
  const axios = new BaseAxios();
  return axios.get(`/payment/${paymentId}/bank`);
};

export const createBank = (data: object) => {
  const axios = new BaseAxios();
  return axios.post(`/bank`, data);
};

export const deleteBankPayment = (idPayment: number, idBank: number) => {
  const axios = new BaseAxios();
  return axios.delete(`/payment/${idPayment}/bank/${idBank}`);
};

export const addBankToPayment = (paymentId: number, bankId: number) => {
  const axios = new BaseAxios();
  return axios.post(`/payment/${paymentId}/bank`, { banks: [bankId] });
};
