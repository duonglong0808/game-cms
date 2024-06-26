import SectionBaccaratDetail from '@/sections/baccarat/detail';

export default function BaccaratDetailPage({ params }: { params: { id: number } }): JSX.Element {
  return <SectionBaccaratDetail baccaratGameId={params.id} />;
}
