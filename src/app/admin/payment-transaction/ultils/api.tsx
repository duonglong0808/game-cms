import { BaseAxios } from '@/lib';

export const getAllPaymentTransactions = (limit: number, page: number, type: number, status: number, sort?: string, typeSort?: string) => {
  const axios = new BaseAxios();

  let url = `/payment-transaction?limit=${limit}&page=${page}&type=${type}`;

  // Kiểm tra và thêm các tham số chỉ khi chúng khác null hoặc undefined
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  if (sort) {
    url += `&sort=${sort}`;
  }
  if (typeSort) {
    url += `&typeSort=${typeSort}`;
  }
  return axios.get(url);
};

export const updateStatusTransaction = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`/payment-transaction/${id}`, data);
};
