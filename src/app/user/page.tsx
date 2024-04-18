import { HeaderContent } from '../components/HeaderContent';

export default function PageUser(): JSX.Element {
  return (
    <main className="min-h-full flex flex-col">
      <HeaderContent path="User" title="Quản lý người dùng" />
      <div className="main-page min-h-full flex-1">
        <h1 className="text-black">aaa</h1>
      </div>
    </main>
  );
}
