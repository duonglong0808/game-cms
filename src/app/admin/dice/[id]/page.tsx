'use client';

import { handleCreateDiceTransaction, handleUpdateStatusPaymentTransaction, useDiceDetail } from './ultils/handleDiceDetail';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataDiceDetail, setDiceDetailIdEdit, setLimitOrPageDiceDetail } from '@/lib/redux/app/diceDetail.slice';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { StatusDiceDetail } from '@/constants';
import { PopupEditOrAddV1 } from '@/uiCore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDateToId } from '@/share';
import { HeaderContent } from '@/components/HeaderContent';

export default function DiceDetailPage({ params }: { params: { id: number } }): JSX.Element {
  const { id } = params;
  const { data, pagination } = useDiceDetail(id);
  const { diceDetailIdEdit, diceDetail } = useAppSelector((state) => state.diceDetail);
  const [boxCreate, setBoxCreate] = useState(false);
  let dataDiceId: any = null;
  if (diceDetailIdEdit) {
    const dataId = diceDetail.find((p) => p.id == +diceDetailIdEdit);
    dataDiceId = [
      {
        name: 'mainTransaction',
        label: 'Phiên trên live gốc ',
        type: 'text',
        value: dataId?.mainTransaction,
        readOnly: true,
      },
      {
        name: 'totalRed',
        label: 'Số lượng bi đỏ',
        type: 'text',
        value: dataId?.totalRed || '',
        readOnly: dataId?.totalRed,
        canUpdate: !dataId?.totalRed,
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

  const dataCreateDto = [
    {
      name: 'mainTransaction',
      label: 'Phiên trên live gốc ',
      type: 'number',
      value: '',
      readOnly: false,
      canUpdate: true,
      required: true,
    },
    {
      name: 'dateId',
      label: 'Id theo ngày',
      type: 'text',
      value: formatDateToId(),
      readOnly: true,
      canUpdate: true,
    },
  ];

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
        <div className="main-page min-h-full flex-1 ">
          <div onClick={() => setBoxCreate(true)} className={'flex pt-1 pb-1 pr-3 pl-3 w-52 items-center border-solid border-slate-400	 border-2 text-black mb-4 rounded-xl cursor-pointer'}>
            <h1 className={'flex-1 '}>Thêm phiên mới</h1>
            <FontAwesomeIcon className={''} color="black" icon={faXmark} />
          </div>
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
          {diceDetailIdEdit && <PopupEditOrAddV1 title="Cập nhật trạng thái ván chơi" textWarning="Nếu không cập nhật dáp án (Số lượng bi đỏ) sẽ bỏ qua không điền vào (Số lượng bi đỏ). Chỉ được cập nhật đáp án 1 lần suy nhất" id={+diceDetailIdEdit} data={dataDiceId || []} onCancel={() => dispatch(setDiceDetailIdEdit({ id: '' }))} onSubmit={handleUpdateStatusPaymentTransaction} />}
          {boxCreate && (
            <PopupEditOrAddV1
              title="Thêm mới ván chơi"
              data={dataCreateDto || []}
              onCancel={() => setBoxCreate(false)}
              id={id}
              onSubmit={(id, data, dispatch) => {
                handleCreateDiceTransaction(id, data, dispatch);
                setBoxCreate(false);
              }}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
