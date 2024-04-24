'use client';
import { usePayment } from './ultils/handleDetailPayment';
import { useAppDispatch } from '@/lib';
import { setLimitOrPagePaymentTypes } from '@/lib/redux/app/paymentType.slice';
import { HeaderContent } from '../../components/HeaderContent';
import Table from '@/uiCore/Table';
import Pagination from '@/uiCore/Pagination';

export default function Detail({ params }: { params: { slug: string } }): JSX.Element {
  const { data, pagination } = usePayment();

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPagePaymentTypes({ page: page }));
  };

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
