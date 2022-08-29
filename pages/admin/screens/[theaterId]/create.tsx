import { useRouter } from 'next/router';

export default function CreateForm() {
  const router = useRouter();
  const { theaterId } = router.query;

  return <>생성 폼 {theaterId}</>;
}

CreateForm.isAdminPage = true;
