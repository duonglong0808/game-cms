'use client';

import { handleUpdateStatusPaymentTransaction, useDiceDetail } from './ultils/handleDiceDetail';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataDiceDetail, setDiceDetailIdEdit, setLimitOrPageDiceDetail } from '@/lib/redux/app/diceDetail.slice';
import { HeaderContent } from '../../components/HeaderContent';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { StatusDiceDetail } from '@/constants';
import { PopupEditV1 } from '@/uiCore';

export default function DiceDetailPage({ params }: { params: { id: number } }): JSX.Element {
  const { id } = params;
  const { data, pagination } = useDiceDetail(id);
  const { diceDetailIdEdit, diceDetail } = useAppSelector((state) => state.diceDetail);
  let dataDiceId: any = null;
  if (diceDetailIdEdit) {
    const dataId = diceDetail.find((p) => p.id == +diceDetailIdEdit);
    dataDiceId = [
      {
        name: 'mainTransaction',
        label: 'Phiên trên live trực tiếp ',
        type: 'text',
        value: dataId?.mainTransaction,
        readOnly: true,
      },
      {
        name: 'totalRed',
        label: 'Số lượng bi đỏ',
        type: 'text',
        value: dataId?.totalRed || '',
        readOnly: true,
      },
      {
        name: 'dateId',
        label: 'Id theo ngày',
        type: 'text',
        value: dataId?.dateId || '',
        readOnly: true,
      },
      {
        name: 'status',
        label: 'Trạng thái',
        type: 'text',
        value: data.find((p) => p.id == +diceDetailIdEdit)?.statusNow,
        readOnly: dataId?.status != StatusDiceDetail.end,
        canUpdate: dataId?.status != StatusDiceDetail.end,
      },
    ];
  }

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageDiceDetail({ page: page }));
  };

  useEffect(() => {
    return () => {
      console.log('okk');
      dispatch(resetDataDiceDetail());
    };
  }, [id]);

  return (
    <main className="min-h-full flex flex-col relative">
      <HeaderContent path="DiceDetail" title="Chi tiết live " />
      {data?.length ? (
        <div className="main-page min-h-full flex-1">
          <Table
            // columnNotShow={['slug']}
            handleEdit={(id) => {
              dispatch(setDiceDetailIdEdit({ id }));
            }}
            textColor="black"
            data={data}
            columnDelete
            columnEdit
            handleDelete={(id) => {}}
          />
          <div>
            <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
          </div>
          {diceDetailIdEdit && <PopupEditV1 title="Cập nhật trạng thái ván chơi" textWarning="Chỉ cần ấn XÁC NHẬN không cần chọn trạng thái" id={+diceDetailIdEdit} data={dataDiceId || []} onCancel={() => dispatch(setDiceDetailIdEdit({ id: '' }))} onSubmit={handleUpdateStatusPaymentTransaction} />}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
