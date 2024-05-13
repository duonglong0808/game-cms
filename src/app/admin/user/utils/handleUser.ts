import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllUser, updateUser } from './api';
import { refreshDataUser, setDataUsers } from '@/lib/redux/app/users.slice';

const useUsers = () => {
  const { isInitData, limit, page, search, users, total } = useAppSelector((state) => state.users);
  const limitRef = useRef(limit);
  const pageRef = useRef(page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData || limit != limitRef.current || page != pageRef.current) {
        const res = await getAllUser(search, page, limit);
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
      }
    }

    fetchData();
  }, [isInitData, limit, page, search]);

  return {
    data: users,
    pagination: { limit, page, total },
  };
};

const updateUserCms = async (userId: number, data: any, dispatch: any) => {
  const res = await updateUser(userId, data);
  console.log('🚀 ~ updateUserCms ~ res:', res);
  if (res) {
    dispatch(refreshDataUser());
  }
};

export { useUsers, updateUserCms };
