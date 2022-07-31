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
          <div className="flex-column me-auto">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">회원가입</li>
              <li className="nav-item">로그인</li>
            </ul>
            <ul className="navbar-nav flex-row">
              <li className="nav-item">회원가입</li>
              <li className="nav-item">로그인</li>
            </ul>
          </div>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
