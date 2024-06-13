'use client';

import { FilterCents } from '@/components/cents/FilterCents';
import { HeaderContent } from '@/components/HeaderContent';
import { useAppDispatch } from '@/lib';
import { resetDataUserPoint, setLimitOrPageUserPoint } from '@/lib/redux/app/pointUser.slice';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { useDataAndHistoryPoint } from '@/utils/handleUserPoint';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PageCoin() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { data, pagination } = useDataAndHistoryPoint(userId);
  const dispatch = useAppDispatch();

  const setPage = (page: number) => {
    dispatch(setLimitOrPageUserPoint({ page: page }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDataUserPoint());
    };
  }, []);

  return (
    <div className="h-full">
      <HeaderContent path="cents" title="Quản lý điểm game" />
      <div className="main-page min-h-full flex-1 relative">
        {userId ? (
          <div className="mb-2">
            <span>Đang tìm kiếm theo userId :</span>
            <span className="font-bold ml-1">{userId}</span>
          </div>
        ) : (
          <></>
        )}
        <FilterCents />

        {data.length ? (
          <>
            <Table
              // columnNotShow={['slug']}
              fontSizeData="13.5px"
              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit={false}
            />
            <div>
              <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={(page) => setPage(page)} />
            </div>
          </>
        ) : (
          <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
        )}
      </div>
    </div>
  );
}
