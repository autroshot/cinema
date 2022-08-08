import Link from 'next/link';
import { ScriptProps } from 'next/script';
import { Container, Nav } from 'react-bootstrap';

export default function AdminLayout({ children }: ScriptProps) {
  return (
    <Container>
      <Nav>
        <Nav.Item>
          <Nav.Link as="div">
            <Link href="/admin/">
              <a>홈</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div">
            <Link href="/admin/theater">
              <a>영화관</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div">
            <Link href="#">
              <a>회원</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div">
            <Link href="/">
              <a>관리자 모드 나가기</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <main>{children}</main>
    </Container>
  );
}
