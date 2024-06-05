'use client';

import { useAppSelector } from '@/lib/redux/utilRedux';

export function LoadingModal(): JSX.Element {
  const { isLoading } = useAppSelector((state) => state.settingApp);

  return isLoading ? (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-[60] flex items-center justify-center bg-white opacity-50">
      <div className="bg-[url(/loading.gif)] h-full w-full bg-[length:15%] lg:bg-[length:5%] bg-no-repeat bg-center"></div>
    </div>
  ) : (
    <></>
  );
}
