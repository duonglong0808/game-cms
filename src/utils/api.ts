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
