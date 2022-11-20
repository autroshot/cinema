import { Container } from 'react-bootstrap';

export default function Index() {
  return (
    <Container className="my-3">
      <h3>관리자 페이지에 오신 것을 환영합니다!</h3>
    </Container>
  );
}

Index.isAdminPage = true;
