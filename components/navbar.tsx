import Image from 'next/image';
import logo from '../public/logo.png';
import { Container, Navbar as BootstrapNavBar } from 'react-bootstrap';

export default function Navbar() {
  return (
    <Container>
      <BootstrapNavBar expand="lg" bg="light">
        <Container>
          <BootstrapNavBar.Brand className="align-middle">
            <Image src={logo} alt="시네마 로고" />
            CINEMA
          </BootstrapNavBar.Brand>
          <span className="justify-content-end">
            <span>회원 가입</span>
            <span>로그인</span>
          </span>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
