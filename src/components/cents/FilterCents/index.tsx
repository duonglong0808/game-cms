'use client';

import { DatePickerCustomer } from '@/uiCore';
import { setDateRangerUserPoint, setRefreshDataUserPoint, setTypeSearchUserPoint } from '@/lib/redux/app/pointUser.slice';
import { useAppDispatch, useAppSelector } from '@/lib';
import { useState } from 'react';
import { ppid } from 'process';

export function FilterCents(): JSX.Element {
  const dispatch = useAppDispatch();
  const { dateFrom, dateTo, typeSearch } = useAppSelector((state) => state.userPoint);
  const [type, setType] = useState(typeSearch);

  return (
    <div className="flex items-center mb-5">
      <div className="mr-10 basis-full lg:basis-1/3">
        <label htmlFor="option-point" className="block mb-4 text-[#575962]">
          Điểm or Lịch sử
        </label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          id="option-point"
          className="px-2 py-1 rounded-xl border-[1px]">
          <option value={'point'}>Điểm các game</option>
          <option value={'history-point'}>Lịch sử nhận & chuyển điểm</option>
        </select>
      </div>

      <DatePickerCustomer
        dateFormat="YYYY-MM-DD"
        onChange={(data) => {
          dispatch(setDateRangerUserPoint({ dateFrom: data.startDate, dateTo: data.endDate }));
        }}
        startDate={dateFrom}
        endDate={dateTo}
        selectsRange={true}
      />

      <button
        onClick={() => {
          if (type !== typeSearch) {
            dispatch(setTypeSearchUserPoint({ typeSearch: type }));
          }
          dispatch(setRefreshDataUserPoint({ isInitData: false }));
        }}
        className="h-fit px-3 py-2 bg-[var(--primary-color)] ml-8 rounded-lg text-white">
        Xác nhận
      </button>
    </div>
  );
}
