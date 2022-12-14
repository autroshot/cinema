import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  return (
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
      <Nav.Item
        as="li"
        className="ms-0 ms-sm-auto"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <Nav.Link as="div">
          <a tabIndex={0}>관리자 나가기</a>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
