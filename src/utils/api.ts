import { BaseAxios } from '@/lib';

export const getAllGift = (page: number, limit: number, status?: number, userIdUse?: number) => {
  const axios = new BaseAxios();
  let url = '/gift-code?';
  if (typeof status == 'number') {
    url += 'status=' + status;
  }
  if (userIdUse) {
    url += '&userIdUse=' + userIdUse;
  }
  if (page) {
    url += '&page=' + page;
  }
  if (limit) {
    url += '&limit=' + limit;
  }
  return axios.get(url);
};

export const createGiftCode = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('/gift-code', data);
};

export const updateGiftCode = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`/gift-code/${id}`, data);
};

export const deleteGiftCode = (id: number) => {
  const axios = new BaseAxios();
  return axios.delete(`/gift-code/${id}`);
};

export const fetchUserInfo = () => {
  const axios = new BaseAxios();
  return axios.get('auth/userInfo');
};

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

export const getDiceDetailBrief = (dateFrom: number, dateTo: number) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);

  let url = `/dice-detail/admin/brief?`;

  // Kiểm tra và thêm các tham số chỉ khi chúng khác null hoặc undefined
  if (dateFrom !== undefined) {
    url += `&dateFrom=${dateFrom}`;
  }
  if (dateTo) {
    url += `&dateTo=${dateTo}`;
  }

  return axios.get(url);
};

export const getTotalUser = () => {
  const axios = new BaseAxios();
  return axios.get('user/total');
};

// Baccarat
export const getAllGameBaccarat = (limit: number, page: number, sort?: string, typeSort?: string) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);

  let url = `/baccarat?limit=${limit}&page=${page}`;

  // Kiểm tra và thêm các tham số chỉ khi chúng khác null hoặc undefined
  if (sort) {
    url += `&sort=${sort}`;
  }
  if (typeSort) {
    url += `&typeSort=${typeSort}`;
  }
  return axios.get(url);
};

export const createBaccaratGameById = (data: any) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);
  return axios.post(`/baccarat`, data);
};

export const updateBaccaratGameById = (id: number, data: any) => {
  const axios = new BaseAxios(process.env.API_GAME_DICE);
  return axios.patch(`/baccarat/${id}`, data);
};
