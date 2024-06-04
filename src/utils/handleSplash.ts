import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { fetchUserInfo } from './api';

export const checkAndFetchDataUser = async (dispatch: any, router: AppRouterInstance) => {
  const userInfo = await fetchUserInfo();
  if (userInfo) {
    dispatch(setDataUserLogin(userInfo?.data));
    return router.push('/admin');
  } else {
    return router.push('/auth/login');
  }
};
