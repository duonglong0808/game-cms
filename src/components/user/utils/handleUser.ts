import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllUser, updateUser } from './api';
import { refreshDataUser, setDataUsers, setFilterUser } from '@/lib/redux/app/users.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import moment from 'moment';

const useUsers = () => {
  const { isInitData, limit, page, search, users, total, phone } = useAppSelector((state) => state.users);
  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const searchRef = useRef(search);
  const phoneRef = useRef(phone);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current || search != searchRef.current || phone != phoneRef.current) {
        dispatch(setLoadingApp({ loading: true }));
        searchRef.current = search;
        phoneRef.current = phone;
        const res = await getAllUser(search, page, limit, phone);
        if (res?.data) {
          const { data, pagination } = res.data;
          pageRef.current = page;
          limitRef.current = limit;
          dispatch(
            setDataUsers({
              users: data,
              ...pagination,
            }),
          );
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isInitData, limit, page, search, phone]);

  return {
    data: users.map((i) => {
      return {
        ...i,
        createdAt: moment(i?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      };
    }),
    pagination: { limit, page, total },
  };
};

const updateSearchUser = (username: string, phone: string, dispatch: any) => {
  dispatch(setFilterUser({ phone, search: username }));
};

const updateUserCms = async (userId: number, data: any, dispatch: any) => {
  const res = await updateUser(userId, data);
  console.log('🚀 ~ updateUserCms ~ res:', res);
  if (res) {
    dispatch(refreshDataUser());
  }
};

export { useUsers, updateUserCms, updateSearchUser };
