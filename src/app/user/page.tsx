'use client';

import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { useUsers } from './utils/handleUser';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch } from '@/lib';
import { setLimitOrPageUser } from '@/lib/redux/app/users.slice';

export default function PageUser(): JSX.Element {
  const dataUser = useUsers();
  const { pagination } = dataUser;
  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageUser({ page: page }));
  };

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="User" title="Quản lý người dùng" />
      <div className="main-page min-h-full flex-1">
        <Table textColor="black" data={dataUser.data} columnDelete columnEdit handleDelete={(id) => {}} handleEdit={(id) => {}} />
        <div>
          <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
        </div>
      </div>
    </main>
  );
}
