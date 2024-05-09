'use client';

import { HeaderContent } from '../components/HeaderContent';
import { updateDiceGame, useDiceGame } from './utils/handleDice';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataDiceGame, setDiceGameEdit, setLimitOrPageDiceGame } from '@/lib/redux/app/diceGame.slice';
import { useEffect } from 'react';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { useRouter } from 'next/navigation';
import { PopupEditOrAddV1 } from '@/uiCore';
import { TypeGameDice } from '@/constants';
import { upLoadOneFile } from '@/share/upLoadFile';

export default function DicePage(): JSX.Element {
  const { data, pagination } = useDiceGame();
  console.log('🚀 ~ DicePage ~ data:', data);
  const router = useRouter();
  const { diceGameIdEdit, diceGame } = useAppSelector((state) => state.diceGame);
  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageDiceGame({ page: page }));
  };

  let dataDiceGameId = null;
  if (diceGameIdEdit) {
    const dataId = diceGame.find((p) => p.id == +diceGameIdEdit);
    if (dataId) {
      dataDiceGameId = [
        {
          name: 'name',
          label: 'Tên phiên live ',
          type: 'text',
          value: dataId.name,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'avtAuthor',
          label: 'Ảnh người live ',
          type: 'image',
          value: dataId.avtAuthor,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'type',
          label: 'Loại live ',
          type: 'options',
          value: dataId.type,
          readOnly: false,
          canUpdate: true,
          dataOption: [
            {
              text: 'Block chain',
              value: TypeGameDice.Blockchain,
            },
            {
              text: 'Chẵn lẻ',
              value: TypeGameDice.ChanLe,
            },
            {
              text: 'Xóc đĩa',
              value: TypeGameDice.XocDia,
            },
          ],
        },
        {
          name: 'nameAuthor',
          label: 'Tên người live ',
          type: 'text',
          value: dataId.nameAuthor,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'nationalAuthor',
          label: 'Quốc tịch người live ',
          type: 'text',
          value: dataId.nationalAuthor,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'idLive',
          label: 'Key live stream ',
          type: 'text',
          value: dataId.idLive,
          readOnly: false,
          canUpdate: true,
        },
        {
          name: 'idChat',
          label: 'Key chat stream ',
          type: 'text',
          value: dataId.idChat,
          readOnly: false,
          canUpdate: true,
        },
      ];
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetDataDiceGame());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="Dice" title="Quản lý bàn xóc đĩa, chi tiết bàn" />

      {data.length ? (
        <div className="main-page min-h-full flex-1">
          <Table
            // columnNotShow={['slug']}
            handleClickRow={(item) => {
              item && router.push(`/admin/dice/${item?.id}`);
            }}
            textColor="black"
            data={data}
            columnDelete
            columnEdit
            handleDelete={(id) => {}}
            handleEdit={(id) => {
              dispatch(setDiceGameEdit({ id }));
            }}
          />
          <div>
            <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
          </div>
          {diceGameIdEdit && <PopupEditOrAddV1 handleUploadOneFile={(file) => upLoadOneFile('image', file)} title="Cập nhật thông tin live" id={+diceGameIdEdit} data={dataDiceGameId || []} onCancel={() => dispatch(setDiceGameEdit({ id: '' }))} onSubmit={updateDiceGame} />}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
