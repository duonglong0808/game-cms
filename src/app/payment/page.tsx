'use client';

import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { usePaymentType } from './ultils/handlePaymentType';
import { useAppDispatch } from '@/lib';
import { setLimitOrPagePaymentTypes } from '@/lib/redux/app/paymentType.slice';
import Pagination from '@/uiCore/Pagination';

export default function PaymentTypePage(): JSX.Element {
  const { data, pagination } = usePaymentType();

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPagePaymentTypes({ page: page }));
  };

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="Payment" title="Quản lý loại, phương hức thanh toán" />
      {data.length ? (
        <div className="main-page min-h-full flex-1">
          <Table textColor="black" data={data} columnDelete columnEdit handleDelete={(id) => {}} handleEdit={(id) => {}} />
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
