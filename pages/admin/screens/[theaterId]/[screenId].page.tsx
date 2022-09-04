import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();
  const { theaterId, screenId } = router.query;

  return (
    <>
      상영관 상세 페이지 {theaterId}/{screenId}
    </>
  );
}

Detail.isAdminPage = true;
