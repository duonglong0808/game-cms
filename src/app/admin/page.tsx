'use client';

import Image from 'next/image';

export default function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Game CMS</h1>
      <Image src="/game-cms.png" alt="Game CMS" width={500} height={500} />
    </main>
  );
}
