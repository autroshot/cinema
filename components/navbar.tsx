import Image from 'next/image';
import logo from '../public/logo.png';
import {
  Container,
  Nav,
  Navbar as BootstrapNavBar,
  NavDropdown,
} from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <Container>
      <BootstrapNavBar expand="md" bg="light" className="p-0">
        <Container className="p-0">
          <BootstrapNavBar.Brand className="mx-3 d-flex align-items-center">
            <Image src={logo} alt="시네마 로고" width={40} height={40} />
            <span className={styles.logoText}>CINEMA</span>
          </BootstrapNavBar.Brand>
          <BootstrapNavBar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavBar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="예매" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">예매하기</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  상영시간표
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="영화" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">홈</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  현재상영작
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  상영예정작
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="영화관" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">월드타워</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">건대입구</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">수원</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">노원</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="스페셜관" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">홈</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">샤롯데</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  수퍼플렉스G
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">컬러리움</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </BootstrapNavBar.Collapse>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
