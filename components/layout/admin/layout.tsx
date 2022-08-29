import Link from 'next/link';
import { ScriptProps } from 'next/script';
import { Container, Nav } from 'react-bootstrap';

export default function Layout({ children }: ScriptProps) {
  return (
    <Container>
      <Nav className="bg-light" as="ul">
        <Nav.Item as="li">
          <Nav.Link>
            <Link href="/admin/">
              <a>홈</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
            <Link href="/admin/theaters">
              <a>영화관</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
            <Link href="/admin/screens">
              <a>상영관</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
            <Link href="">
              <a>회원</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className="ms-auto">
          <Nav.Link>
            <Link href="/">
              <a>관리자 나가기</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <main>{children}</main>
    </Container>
  );
}
