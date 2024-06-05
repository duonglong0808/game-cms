'use client';

import { TypePaymentTranSaction } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib';
import { setDateRangerDashboard } from '@/lib/redux/system/settingSys';
import { DatePickerCustomer, ShowDataDetailV1 } from '@/uiCore';
import { getPaymentTransactionsBrief } from '@/utils/api';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AdminHome() {
  const dispatch = useAppDispatch();

  const { dateFrom, dateTo } = useAppSelector((state) => state.settingApp);
  const [submit, setSubmit] = useState(true);
  const [dataDetail, setDataDetail] = useState<{
    deposit: number;
    withdraw: number;
  }>();

  useEffect(() => {
    async function fetchData() {
      if (submit) {
        const [payment] = await Promise.all([getPaymentTransactionsBrief(dateFrom, dateTo, null)]);
        if (payment?.data) {
          console.log('🚀 ~ fetchData ~ payment?.data:', payment?.data);
          setDataDetail((pre) => {
            return {
              ...pre,
              deposit: payment?.data?.data?.find((i: any) => i.type == TypePaymentTranSaction.deposit)?.totalPoints * 1000 || 0,
              withdraw: payment?.data?.data?.find((i: any) => i.type == TypePaymentTranSaction.withdrawMoney)?.totalPoints * 1000 || 0,
            };
          });
        }
        setSubmit(false);
      }
    }

    fetchData();
  }, [submit]);

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to Game CMS</h1>
      <div className="flex justify-start items-center">
        <DatePickerCustomer
          dateFormat="YYYY-MM-DD"
          onChange={(data) => {
            dispatch(setDateRangerDashboard({ dateFrom: data.startDate, dateTo: data.endDate }));
          }}
          startDate={dateFrom}
          endDate={dateTo}
          selectsRange={true}
        />

        <button className="ml-2 px-4 py-2 bg-[var(--primary-color)] h-fit text-white rounded-xl">Kiểm tra</button>
      </div>

      <div className="flex justify-around">
        <ShowDataDetailV1
          iconTitle={faMeteor}
          title="Tổng nạp đã duyệt"
          unit="VNĐ"
          value={
            dataDetail?.deposit?.toLocaleString('en-US', {
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
            dataDetail?.deposit?.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || 0
          }
        />
      </div>
    </main>
  );
}
