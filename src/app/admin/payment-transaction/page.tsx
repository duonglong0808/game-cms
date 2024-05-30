'use client';
import Table from '@/uiCore/Table';
import { HeaderContent } from '../components/HeaderContent';
import { handleUpdateStatusPaymentTransaction, useDataTotalDepositAndWithdraw, usePaymentTransaction } from './ultils/handlePT';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataPaymentTransaction, setLimitOrPagePaymentTransaction, setTransactionEdit } from '@/lib/redux/app/paymentTransaction.slice';
import { useEffect } from 'react';
import { StatusPaymentTranSaction } from '@/constants';
import { DatePickerCustomer, PopupEditOrAddV1, ShowDataDetailV1 } from '@/uiCore';
import { OptionPaymentTransaction } from './components/OptionPaymentTrans';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentTransactionPage(): JSX.Element {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();
  const { data, pagination } = usePaymentTransaction(userId);
  const { transactionIdEdit, paymentTransaction } = useAppSelector((state) => state.paymentTransaction);
  const { deposit, withdraw } = useDataTotalDepositAndWithdraw(userId);
  // console.log('🛫🛫🛫 ~ file: page.tsx:17 ~ PaymentTransactionPage ~ deposit, withdraw:', deposit, withdraw);

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

      <div className="main-page min-h-full flex-1 relative">
        {userId ? (
          <div className="mb-2">
            <span>Đang tìm kiếm dữ liệu của userId : </span>
            <span className="font-bold">{userId}</span>

            <button
              onClick={() => {
                router.push('/admin/payment-transaction');
              }}
              className="ml-3 px-2 py-1 bg-red-400 text-white rounded-lg">
              Clean
            </button>
          </div>
        ) : (
          <></>
        )}
        <OptionPaymentTransaction />
        <div className="flex justify-around">
          <ShowDataDetailV1
            iconTitle={faMeteor}
            title="Tổng nạp đã duyệt"
            unit="VNĐ"
            value={
              deposit?.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                useGrouping: true,
              }) || 0
            }
            colorTitle="#696be7"
            colorValue="#a6ff00"
          />
          <ShowDataDetailV1
            title="Tổng rút đã duyệt"
            unit="VNĐ"
            colorTitle="#696be7"
            colorValue="red"
            value={
              withdraw?.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                useGrouping: true,
              }) || 0
            }
          />
        </div>
        {data.length ? (
          <>
            <Table
              // columnNotShow={['slug']}
              fontSizeData="13.5px"
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
