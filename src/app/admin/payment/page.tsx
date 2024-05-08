'use client';

import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { usePaymentType } from './ultils/handlePaymentType';
import { useAppDispatch } from '@/lib';
import { resetDataPaymentType, setLimitOrPagePaymentTypes } from '@/lib/redux/app/paymentType.slice';
import Pagination from '@/uiCore/Pagination';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { PaginationControl } from '@/uiCore/LimitControl';

export default function PaymentTypePage(): JSX.Element {
  const { data, pagination } = usePaymentType();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const setPageOrLimitPaymentType = (page?: number, limit?: number) => {
    dispatch(setLimitOrPagePaymentTypes({ page, limit }));
  };

  useEffect(() => {
    return () => {
      console.log('okk payment -type');
      dispatch(resetDataPaymentType());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <main className="min-h-full flex flex-col">
        <HeaderContent path="Payment" title="Quản lý loại, phương hức thanh toán" />
        {data.length ? (
          <div className="main-page min-h-full flex-1">
            <Table
              // columnNotShow={['slug']}
              handleClickRow={(item) => {
                item?.status == 'ACTIVE' && router.push(`/admin/payment/${item?.id}`);
              }}
              textColor="black"
              data={data}
              columnDelete
              columnEdit
              handleDelete={(id) => {}}
              handleEdit={(id) => {}}
            />
            <div className="flex">
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageOrLimitPaymentType(page)} />
              <PaginationControl limit={pagination.limit} setLimit={(limit) => setPageOrLimitPaymentType(undefined, +limit)} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </Suspense>
  );
}
