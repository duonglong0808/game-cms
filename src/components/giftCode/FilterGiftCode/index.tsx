'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib';
import { StatusGiftCode } from '@/constants';
import { reFreshDataGiftCode, resetDataGiftCode, setFilterGiftCode } from '@/lib/redux/app/gifCode.slice';

export function FilterGiftCode(): JSX.Element {
  const { status, userIdUse } = useAppSelector((state) => state.gifCode);
  const dispatch = useAppDispatch();

  return (
    <div className="mb-6">
      <div className="flex mb-3 items-center">
        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">Trạng thái</span>
          <select onChange={(e) => dispatch(setFilterGiftCode({ status: +e.target.value }))} value={status} className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg">
            <option value={undefined}>Tất cả</option>
            <option value={StatusGiftCode.Created}>Đã tạo</option>
            <option value={StatusGiftCode.Used}>Đã nhận</option>
            <option value={StatusGiftCode.Disable}>Đã vô hiệu hóa</option>
          </select>
        </div>

        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">{`UserId đã nhận quà`}</span>
          <input
            //
            className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg"
            placeholder="Nhập userId"
            type="text"
            name="userIdUse"
            value={userIdUse || ''}
            onChange={(e) => dispatch(setFilterGiftCode({ userIdUse: e.target.value }))}
          />
        </div>
        <div className="flex basis-full lg:basis-1/3">
          <button type="button" onClick={() => dispatch(reFreshDataGiftCode())} className="mr-2 px-2 py-1 rounded-lg h-10 text-white bg-[var(--primary-color)] ">
            Tìm kiếm
          </button>
          <button type="button" onClick={() => dispatch(resetDataGiftCode())} className="px-2 py-1 rounded-lg h-10 text-white bg-red-400 mr-3">
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}
