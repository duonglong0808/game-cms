import { BaseAxios } from '@/lib';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const checkAndFetchDataUser = async (dispatch: any, router: AppRouterInstance) => {
  const axios = new BaseAxios();
  const userInfo = await axios.get('auth/userInfo');
  if (userInfo) {
    dispatch(setDataUserLogin(userInfo?.data));
  } else {
    return router.push('/auth/login');
  }
};
