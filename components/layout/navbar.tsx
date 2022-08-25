import Image from 'next/image';
import logo from 'public/logos/site-with-text.png';
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
                <NavDropdown.Item href="">예매하기</NavDropdown.Item>
                <NavDropdown.Item href="">상영시간표</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="영화" id="basic-nav-dropdown">
                <NavDropdown.Item href="">홈</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">현재상영작</NavDropdown.Item>
                <NavDropdown.Item href="">상영예정작</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="영화관" id="basic-nav-dropdown">
                <Link href="/theaters/1000" passHref>
                  <NavDropdown.Item>건대입구</NavDropdown.Item>
                </Link>
                <Link href="/theaters/1001" passHref>
                  <NavDropdown.Item>김포공항</NavDropdown.Item>
                </Link>
                <Link href="/theaters/1002" passHref>
                  <NavDropdown.Item>노원</NavDropdown.Item>
                </Link>
                <Link href="/theaters/1003" passHref>
                  <NavDropdown.Item>수원</NavDropdown.Item>
                </Link>
                <Link href="/theaters/1004" passHref>
                  <NavDropdown.Item>월드타워</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <NavDropdown title="스페셜관" id="basic-nav-dropdown">
                <Link href="/special-screens/" passHref>
                  <NavDropdown.Item>홈</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link href="/special-screens/super-plex-g" passHref>
                  <NavDropdown.Item>수퍼플렉스G</NavDropdown.Item>
                </Link>
                <Link href="/special-screens/colorium" passHref>
                  <NavDropdown.Item>컬러리움</NavDropdown.Item>
                </Link>
                <Link href="/special-screens/cine-couple" passHref>
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
                <Link href="">
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
