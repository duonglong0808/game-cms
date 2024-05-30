'use client';

import { useState } from 'react';
import { updateSearchUser } from '../utils/handleUser';
import { useAppDispatch } from '@/lib';

export function FilterUser(): JSX.Element {
  const [username, setUsername] = useState('');
  const [ip, setIp] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();

  return (
    <div className="mb-6">
      <div className="flex mb-3">
        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">UserName</span>
          <input className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg" placeholder="Nhập username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">{`Ip đăng ký  (Chưa phát triển)`}</span>
          <input className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg" placeholder="Nhập ip" type="text" name="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>

        <div className="basis-full lg:basis-1/3">
          <span className="block mb-2 font-semibold">{`Số điện thoại (bỏ số 0 ở đầu)`}</span>
          <input className="w-[90%] border-[1px] px-2 py-1 border-[#999] rounded-lg" placeholder="Nhập phone" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="flex">
        <button type="button" onClick={() => updateSearchUser(username, phone, dispatch)} className="mr-2 px-2 py-1 rounded-lg text-white bg-[var(--primary-color)] ">
          Tìm kiếm
        </button>
        <button
          type="button"
          onClick={() => {
            setUsername('');
            setPhone('');
            updateSearchUser('', '', dispatch);
          }}
          className="px-2 py-1 rounded-lg text-white bg-red-400 ">
          Clean
        </button>
      </div>
    </div>
  );
}
