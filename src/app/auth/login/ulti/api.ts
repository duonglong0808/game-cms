import { BaseAxios } from '@/lib';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';

export const login = (userName: string, password: string, isRemember: boolean) => {
  const axios = new BaseAxios();
  return axios.post('/auth/cms/login', {
    account: userName,
    password: password,
    isRemember,
  });
};

export const getUserInfo = async () => {
  const axios = new BaseAxios();
  return axios.get('auth/userInfo');
};
