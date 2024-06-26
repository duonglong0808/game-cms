'use client';
import Table from '@/uiCore/Table';
import { HeaderContent } from '@/components/HeaderContent';
import Pagination from '@/uiCore/Pagination';
import { useAppDispatch } from '@/lib';
import { useEffect } from 'react';
import { useBaccaratPlayHistory } from '@/utils/handleHistoryPlayBacca';
import { setLimitOrPageBaccaratPlayHistory, resetDataBaccaratPlayHistory } from '@/lib/redux/app/baccaratPlayHistory.slice';
import { SearchBaccaratPlayHistory } from '@/components/historyBaccarat/SearchBaccaratPlayHistory';

export default function SectionHistoryPlayBaccarat(): JSX.Element {
  const { data, pagination } = useBaccaratPlayHistory();

  const dispatch = useAppDispatch();

  const setPageUser = (page: number) => {
    dispatch(setLimitOrPageBaccaratPlayHistory({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataBaccaratPlayHistory());
    };
  }, []);

  return (
    <main className="min-h-full flex flex-col relative">
      <HeaderContent path="HistoryPlayBaccarat" title="Lịch sử chơi baccarat" />

      <div className="main-page min-h-full flex-1 relative">
        <SearchBaccaratPlayHistory />
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
