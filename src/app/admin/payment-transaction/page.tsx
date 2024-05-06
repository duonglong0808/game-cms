'use client';
import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { handleUpdateStatusPaymentTransaction, useDataTotalDepositAndWithdraw, usePaymentTransaction } from './ultils/handlePT';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataPaymentTransaction, setDateRangerPaymentTrans, setLimitOrPagePaymentTransaction, setTransactionEdit } from '@/lib/redux/app/paymentTransaction.slice';
import { useEffect } from 'react';
import { StatusPaymentTranSaction } from '@/constants';
import { DatePickerCustomer, PopupEditOrAddV1 } from '@/uiCore';
import { OptionPaymentTransaction } from './components/OptionPaymentTrans';

export default function PaymentTransactionPage(): JSX.Element {
  const { data, pagination } = usePaymentTransaction();
  const { transactionIdEdit, paymentTransaction } = useAppSelector((state) => state.paymentTransaction);
  const { deposit, withdraw, dateFrom, dateTo } = useDataTotalDepositAndWithdraw();
  console.log('🛫🛫🛫 ~ file: page.tsx:17 ~ PaymentTransactionPage ~ deposit, withdraw:', deposit, withdraw);

  let dataTransactionById = null;
  if (transactionIdEdit) {
    const dataId = paymentTransaction.find((p) => p.id == +transactionIdEdit);
    dataTransactionById = [
      {
        name: 'userTransfer',
        label: 'Người chuyển',
        type: 'text',
        value: dataId?.bankTransfer?.accountOwner || '',
        readOnly: true,
      },
      {
        name: 'userReceive',
        label: 'Người nhận',
        type: 'text',
        value: dataId?.bankReceive?.accountOwner || '',
        readOnly: true,
      },
      {
        name: 'point',
        label: 'Số điểm',
        type: 'text',
        value: dataId?.point || '',
        readOnly: true,
      },
      {
        name: 'status',
        label: 'Trạng thái',
        type: 'options',
        value: Number(dataId?.status),
        dataOption: [
          {
            text: 'Chờ xử lý',
            value: StatusPaymentTranSaction.processing,
          },
          {
            text: 'Thành công',
            value: StatusPaymentTranSaction.success,
          },
          {
            text: 'Hủy bỏ',
            value: StatusPaymentTranSaction.cancel,
          },
        ],
        readOnly: dataId?.status != StatusPaymentTranSaction.processing,
        canUpdate: dataId?.status == StatusPaymentTranSaction.processing,
      },
    ];
  }

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPagePaymentTransaction({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataPaymentTransaction());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col relative">
      <HeaderContent path="PaymentTransaction" title="Quản lý nạp rút tiền người dùng" />
      <div>
        <DatePickerCustomer
          onChange={(data) => {
            dispatch(setDateRangerPaymentTrans({ dateFrom: data.startDate, dateTo: data.endDate }));
          }}
          startDate={dateFrom}
          endDate={dateTo}
          selectsRange
        />
      </div>
      <div className="main-page min-h-full flex-1 relative">
        <OptionPaymentTransaction />
        {data.length ? (
          <>
            <Table
              // columnNotShow={['slug']}

              textColor="black"
              data={data}
              columnDelete
              columnEdit
              handleDelete={(id) => {}}
              handleEdit={(id) => {
                dispatch(setTransactionEdit({ id }));
              }}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
            </div>
            {transactionIdEdit && <PopupEditOrAddV1 id={+transactionIdEdit} data={dataTransactionById || []} onCancel={() => dispatch(setTransactionEdit({ id: '' }))} onSubmit={handleUpdateStatusPaymentTransaction} />}
          </>
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
      </div>
    </main>
  );
}
