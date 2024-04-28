'use client';

import { HeaderContent } from '../components/HeaderContent';
import { useDiceGame } from './utils/handleDice';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataDiceGame, setLimitOrPageDiceGame } from '@/lib/redux/app/diceGame.slice';
import { useEffect } from 'react';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { useRouter } from 'next/navigation';

export default function DicePage(): JSX.Element {
  const { data, pagination } = useDiceGame();
  const router = useRouter();
  const { diceGameIdEdit, diceGame } = useAppSelector((state) => state.diceGame);
  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageDiceGame({ page: page }));
  };

  let dataDiceGameId = null;
  if (diceGameIdEdit) {
    const dataId = diceGame.find((p) => p.id == +diceGameIdEdit);
    dataDiceGameId = [
      {
        name: 'idLive',
        label: 'Key live stream ',
        type: 'text',
        value: dataId?.idLive,
        readOnly: true,
      },
    ];
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
            handleEdit={(id) => {}}
          />
          <div>
            <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
