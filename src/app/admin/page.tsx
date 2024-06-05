'use client';

import { TypePaymentTranSaction } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib';
import { setDateRangerDashboard } from '@/lib/redux/system/settingSys';
import { DatePickerCustomer, ShowDataDetailV1 } from '@/uiCore';
import { getDiceDetailBrief, getPaymentTransactionsBrief, getTotalUser } from '@/utils/api';
import { faDice, faGift, faMeteor, faMoneyBillTransfer, faUsers } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AdminHome() {
  const dispatch = useAppDispatch();

  const { dateFrom, dateTo } = useAppSelector((state) => state.settingApp);
  const [submit, setSubmit] = useState(true);
  const [dataDetail, setDataDetail] = useState<{
    deposit?: number;
    withdraw?: number;
    totalBetSum?: number;
    totalRewardSum?: number;
    totalUser?: number;
  }>();

  useEffect(() => {
    async function fetchData() {
      if (submit) {
        const dateFromId = +moment(dateFrom).format('YYYYMMDD');
        const dateToId = +moment(dateTo).format('YYYYMMDD');
        const [payment, dice, user] = await Promise.all([getPaymentTransactionsBrief(dateFrom, dateTo, null), getDiceDetailBrief(dateFromId, dateToId), getTotalUser()]);

        const newDataDetail = { ...dataDetail };
        if (payment?.data) {
          newDataDetail.deposit = payment?.data?.data?.find((i: any) => i.type == TypePaymentTranSaction.deposit)?.totalPoints * 1000 || 0;
          newDataDetail.withdraw = payment?.data?.data?.find((i: any) => i.type == TypePaymentTranSaction.withdrawMoney)?.totalPoints * 1000 || 0;
        }
        if (dice.data) {
          newDataDetail.totalBetSum = dice.data?.totalBetSum * 1000 || 0;
          newDataDetail.totalRewardSum = dice.data?.totalRewardSum * 1000 || 0;
        }
        if (user?.data) newDataDetail.totalUser = user?.data;
        setDataDetail({ ...newDataDetail });
        setSubmit(false);
      }
    }

    fetchData();
  }, [submit]);

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to Game CMS</h1>
      <div className="flex justify-start items-start">
        <DatePickerCustomer
          dateFormat="YYYY-MM-DD"
          onChange={(data) => {
            dispatch(setDateRangerDashboard({ dateFrom: data.startDate, dateTo: data.endDate }));
          }}
          startDate={dateFrom}
          endDate={dateTo}
          selectsRange={true}
        />

        <button onClick={() => setSubmit(true)} className="ml-4 mt-3 px-4 py-2 bg-[var(--primary-color)] h-fit text-white rounded-xl">
          Kiểm tra
        </button>
      </div>

      <div className="flex justify-around flex-wrap">
        <ShowDataDetailV1
          iconTitle={faUsers}
          title="Tổng thành viên"
          unit="Người"
          value={
            dataDetail?.totalUser?.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || 0
          }
          colorTitle="#696be7"
          colorValue="#a6ff00"
        />
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
          iconTitle={faMoneyBillTransfer}
          colorTitle="#696be7"
          colorValue="red"
          value={
            dataDetail?.withdraw?.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || 0
          }
        />
        <ShowDataDetailV1
          title="Tổng cược"
          unit="VNĐ"
          colorTitle="#696be7"
          colorValue="#a6ff00"
          iconTitle={faDice}
          value={
            dataDetail?.totalBetSum?.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || 0
          }
        />
        <ShowDataDetailV1
          title="Tổng cược trả thưởng"
          unit="VNĐ"
          colorTitle="#696be7"
          colorValue="red"
          iconTitle={faGift}
          value={
            dataDetail?.totalRewardSum?.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || 0
          }
        />
      </div>
    </main>
  );
}
