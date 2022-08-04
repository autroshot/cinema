import Image from 'next/image';
import logo from '../public/logo-with-text.png';
import {
  Container,
  Nav,
  Navbar as BootstrapNavBar,
  NavDropdown,
} from 'react-bootstrap';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Container>
      <BootstrapNavBar expand="md" bg="white" className="py-0">
        <Container className="px-0">
          <BootstrapNavBar.Brand className="d-flex align-items-center">
            <Link href="/">
              <a>
                <Image src={logo} alt="시네마 로고" />
              </a>
            </Link>
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
                <Link href="/special-screen/" passHref>
                  <NavDropdown.Item>홈</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">샤롯데</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  수퍼플렉스G
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">컬러리움</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#login">로그인</Nav.Link>
            </Nav>
          </BootstrapNavBar.Collapse>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
