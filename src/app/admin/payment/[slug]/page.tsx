import { useRouter } from 'next/router';

export default function Detail({ params }: { params: { slug: string } }): JSX.Element {
  // const router = useRouter();
  return <p>Post: {params.slug}</p>;
}
