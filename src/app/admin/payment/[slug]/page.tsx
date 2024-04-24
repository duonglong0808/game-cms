'use client';
import { usePayment } from './ultils/handleDetailPayment';
import { useAppDispatch } from '@/lib';
import { setLimitOrPagePaymentTypes } from '@/lib/redux/app/paymentType.slice';
import { HeaderContent } from '../../components/HeaderContent';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';
import { useEffect } from 'react';
import { resetDataPayment } from '@/lib/redux/app/payment.slice';

export default function Detail({ params }: { params: { slug: number } }): JSX.Element {
  const { slug } = params;
  const { data, pagination } = usePayment(slug);

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPagePaymentTypes({ page: page }));
  };

  useEffect(() => {
    return () => {
      console.log('okk');
      dispatch(resetDataPayment());
    };
  }, [slug]);

  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="Payment" title="Chi tiết phương thức thanh toán" />
      {data.length ? (
        <div className="main-page min-h-full flex-1">
          <Table
            // columnNotShow={['slug']}

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
