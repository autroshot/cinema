import Link from 'next/link';
import { ScriptProps } from 'next/script';
import { Container, Nav } from 'react-bootstrap';

export default function Layout({ children }: ScriptProps) {
  return (
    <Container>
      <Nav className="bg-light" as="ul">
        <Nav.Item as="li">
          <Nav.Link as="div">
            <Link href="/admin/">홈</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as="div">
            <Link href="/admin/theaters">영화관</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as="div">
            <Link href="/admin/screens">상영관</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className="ms-0 ms-sm-auto">
          <Nav.Link as="div">
            <Link href="/">관리자 나가기</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <main>{children}</main>
    </Container>
  );
}
