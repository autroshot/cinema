import { useRouter } from 'next/router';

export default function Theater() {
  const router = useRouter();
  const { id } = router.query;

  return `현재 id: ${id}`;
}
