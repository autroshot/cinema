import Image from 'next/image';
import logo from '../public/logo.png';
import { Container, Navbar as BootstrapNavBar } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <Container>
      <BootstrapNavBar expand="lg" bg="light">
        <Container>
          <BootstrapNavBar.Brand>
            <Image src={logo} alt="시네마 로고" width={40} height={40} />
            <span className={styles.logoText}>CINEMA</span>
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
