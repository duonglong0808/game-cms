'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import { checkAndFetchDataUser } from '@/utils/handleSplash';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      checkAndFetchDataUser(dispatch, router);
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-between p-24 overflow-hidden">
      <Image src="/KU_logo.svg" alt="Game CMS" width={105} height={23} className="w-[80%] h-[80%] object-contain animate-pulse" />
    </main>
  );
}
