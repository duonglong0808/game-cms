'use client';
import Table from '@/uiCore/Table';
import { HeaderContent } from '@/components/HeaderContent';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch } from '@/lib';
import { useEffect } from 'react';
import { resetDataDicePlayHistory, setLimitOrPageDicePlayHistory } from '@/lib/redux/app/dicePlayHistory.slice';
import { useDicePlayHistory } from './ultils/handleDiceHistory';
import { SearchDeicePlayHistory } from './components/SearchDeicePlayHistory';

export default function PaymentTransactionPage(): JSX.Element {
  const { data, pagination } = useDicePlayHistory();

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageDicePlayHistory({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataDicePlayHistory());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col relative">
      <HeaderContent path="PaymentTransaction" title="Quản lý nạp rút tiền người dùng" />

      <div className="main-page min-h-full flex-1 relative">
        <SearchDeicePlayHistory />
        {data.length ? (
          <>
            <Table
              // columnNotShow={['slug']}

              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit={false}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPageUser(page)} />
            </div>
          </>
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
      </div>
    </main>
  );
}
