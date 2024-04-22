import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect, useRef } from 'react';
import { getAllUser } from './api';
import { setDataUsers } from '@/lib/redux/app/users.slice';

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
  }, [limit, page, search]);

  return {
    data: users,
    pagination: { limit, page, total },
  };
};

export { useUsers };
