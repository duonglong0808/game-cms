'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { HeaderContent } from '@/components/HeaderContent';
import { useBaccaratDetail } from '@/utils/handleBaccaratDetail';
import { resetDataBaccaratDetail, setBaccaratDetailIdEdit, setLimitOrPageBaccaratDetail } from '@/lib/redux/app/baccaratDetail.slice';

export default function SectionBaccaratDetail({ baccaratGameId }: { baccaratGameId: number }): JSX.Element {
  const { data, pagination } = useBaccaratDetail(baccaratGameId);

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageBaccaratDetail({ page: page }));
  };

  useEffect(() => {
    return () => {
      console.log('okk');
      dispatch(resetDataBaccaratDetail());
    };
  }, [baccaratGameId]);

  return (
    <main className="min-h-full flex flex-col relative">
      <HeaderContent path="DiceDetail" title="Chi tiết live " />
      {data?.length ? (
        <div className="main-page min-h-full flex-1 ">
          {/* <div onClick={() => setBoxCreate(true)} className={'flex pt-1 pb-1 pr-3 pl-3 w-52 items-center border-solid border-slate-400	 border-2 text-black mb-4 rounded-xl cursor-pointer'}>
            <h1 className={'flex-1 '}>Thêm phiên mới</h1>
            <FontAwesomeIcon className={''} color="black" icon={faXmark} />
          </div> */}
          <h4 className="mb-2 text-black">
            Chú thích: <br></br> C: Tép, D: Rô, H: Cơ, S: Bích
          </h4>
          <Table
            // columnNotShow={['slug']}
            handleEdit={(id) => {
              dispatch(setBaccaratDetailIdEdit({ id }));
            }}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit
            handleDelete={(id) => {}}
          />
          <div>
            <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
          </div>
          {/* {diceDetailIdEdit && <PopupEditOrAddV1 title="Cập nhật trạng thái ván chơi" textWarning="Nếu không cập nhật dáp án (Số lượng bi đỏ) sẽ bỏ qua không điền vào (Số lượng bi đỏ). Chỉ được cập nhật đáp án 1 lần suy nhất" id={+diceDetailIdEdit} data={dataDiceId || []} onCancel={() => dispatch(setDiceDetailIdEdit({ id: '' }))} onSubmit={handleUpdateStatusPaymentTransaction} />}
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
          )} */}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
