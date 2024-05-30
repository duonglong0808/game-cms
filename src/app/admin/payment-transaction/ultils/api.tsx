import { BaseAxios } from '@/lib';

export const getAllPaymentTransactions = (limit: number, page: number, type: number, status: number, dateFrom: string, dateTo: string, userId: string | null, sort?: string, typeSort?: string) => {
  console.log('🚀 ~ getAllPaymentTransactions ~ userId:', userId);
  const axios = new BaseAxios();

  let url = `/payment-transaction/cms?limit=${limit}&page=${page}&type=${type}`;

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
  if (userId) {
    url += `&userId=${userId}`;
  }
  if (dateFrom || dateTo) {
    url += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }
  return axios.get(url);
};

export const getPaymentTransactionsBrief = (dateFrom: string, dateTo: string, userId: string | null) => {
  const axios = new BaseAxios();

  let url = `/payment-transaction/brief?`;

  // Kiểm tra và thêm các tham số chỉ khi chúng khác null hoặc undefined
  if (dateFrom !== undefined) {
    url += `&dateFrom=${dateFrom}`;
  }
  if (dateTo) {
    url += `&dateTo=${dateTo}`;
  }
  if (userId) {
    url += `&userId=${userId}`;
  }

  return axios.get(url);
};

export const updateStatusTransaction = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`/payment-transaction/${id}`, data);
};
