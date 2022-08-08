import Image from 'next/image';
import logo from '../public/logos/site-with-text.png';
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
                <Link href="/special-screen/super-plex-g" passHref>
                  <NavDropdown.Item>수퍼플렉스G</NavDropdown.Item>
                </Link>
                <Link href="/special-screen/colorium" passHref>
                  <NavDropdown.Item>컬러리움</NavDropdown.Item>
                </Link>
                <Link href="/special-screen/cine-couple" passHref>
                  <NavDropdown.Item>씨네커플</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link as="div">
                <Link href="/admin/">
                  <a>관리자</a>
                </Link>
              </Nav.Link>
              <Nav.Link as="div">
                <Link href="#">
                  <a>로그인</a>
                </Link>
              </Nav.Link>
            </Nav>
          </BootstrapNavBar.Collapse>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
