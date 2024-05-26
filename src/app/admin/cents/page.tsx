import { FilterCents } from '@/components/cents/FilterCents';
import { HeaderContent } from '../components/HeaderContent';

export default function PageCoin() {
  return (
    <div>
      <HeaderContent path="cents" title="Quản lý điểm game" />
      <FilterCents />
    </div>
  );
}
