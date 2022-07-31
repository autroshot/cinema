import Image from 'next/image';
import logo from '../public/logo.png';
import { Container, Nav, Navbar as BootstrapNavBar } from 'react-bootstrap';
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
          <div className="me-auto flex-column">
            <Nav className="flex-row">
              <Nav.Link>회원가입</Nav.Link>
              <Nav.Link>로그인</Nav.Link>
            </Nav>
            <Nav className="flex-row">
              <Nav.Link>예매</Nav.Link>
              <Nav.Link>영화</Nav.Link>
              <Nav.Link>영화관</Nav.Link>
            </Nav>
          </div>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
