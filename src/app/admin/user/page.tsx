'use client';

import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { updateUserCms, useUsers } from './utils/handleUser';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch } from '@/lib';
import { resetDataUser, setLimitOrPageUser } from '@/lib/redux/app/users.slice';
import { useEffect, useState } from 'react';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { Status, TypeUser } from '@/constants';

export default function PageUser(): JSX.Element {
  const dataUser = useUsers();
  const { pagination, data } = dataUser;
  const dispatch = useAppDispatch();
  const [userEdit, setUserId] = useState('');

  let dataUserEdit: ItemAddOrUpdateDto[] = [];
  if (userEdit) {
    const dataId = data.find((p: any) => p.id == userEdit);
    if (dataId) {
      dataUserEdit = [
        {
          name: 'name',
          label: 'Tên người dùng',
          type: 'text',
          value: dataId.name,
          readOnly: true,
          canUpdate: false,
        },
        {
          name: 'typeUser',
          label: 'Loại user ',
          type: 'options',
          value: dataId.typeUser,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Người chơi thường',
              value: TypeUser.Normal,
            },
            {
              text: 'Quản lý ứng dụng',
              value: TypeUser.Admin,
            },
          ],
        },
        {
          name: 'phone',
          label: 'Số điện thoại người dùng ',
          type: 'text',
          value: dataId.phone,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'status',
          label: 'Trạng thái người dùng',
          type: 'options',
          value: dataId.status,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Hoạt động',
              value: Status.Active,
            },
            {
              text: 'Chặn',
              value: Status.Inactive,
            },
          ],
        },
      ];
    }
  }

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageUser({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataUser());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="User" title="Quản lý người dùng" />
      {data.length ? (
        <div className="main-page min-h-full flex-1">
          <Table
            textColor="black"
            data={data}
            columnDelete
            columnEdit
            handleDelete={(id) => {}}
            handleEdit={(id) => {
              setUserId(String(id));
            }}
          />
          <div>
            <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
          </div>
          {userEdit ? (
            <PopupEditOrAddV1
              title="Cập nhật thông tin user"
              id={+userEdit}
              data={dataUserEdit}
              onCancel={() => setUserId('')}
              onSubmit={(id, data, dispatch) => {
                updateUserCms(id, data, dispatch);
                setUserId('');
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
