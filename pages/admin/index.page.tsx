import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';

export default function Index() {
  const { data: session } = useSession();

  return (
    <Container className="my-3">
      <h3>관리자 페이지에 오신 것을 환영합니다!</h3>
      <p>{session?.user?.name}이 로그인되었습니다.</p>
    </Container>
  );
}

Index.isAdminPage = true;
