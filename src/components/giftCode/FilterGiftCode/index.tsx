'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib';

export function FilterGiftCode(): JSX.Element {
  const [username, setUsername] = useState('');
  const [ip, setIp] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();

  return (
    <div className="mb-6">
      <div className="flex mb-3 items-center">
        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">Trạng thái</span>
          <select className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg">
            <option>Tất cả</option>
            <option>Đã tạo</option>
            <option>Đã nhận</option>
            <option>Đã vô hiệu hóa</option>
          </select>
        </div>

        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">{`UserId đã nhận quà`}</span>
          <input className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg" placeholder="Nhập userId" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex basis-full lg:basis-1/3">
          <button
            type="button"
            onClick={
              () => console.log('AA')
              // updateSearchUser(username, phone, dispatch)
            }
            className="mr-2 px-2 py-1 rounded-lg h-10 text-white bg-[var(--primary-color)] ">
            Tìm kiếm
          </button>
          <button
            type="button"
            onClick={() => {
              setUsername('');
              setPhone('');
              // updateSearchUser('', '', dispatch);
            }}
            className="px-2 py-1 rounded-lg h-10 text-white bg-red-400 mr-3">
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}
