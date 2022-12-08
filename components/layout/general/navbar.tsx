import Image from 'next/image';
import logo from 'public/logos/site-with-text.png';
import {
  Container,
  Nav,
  Navbar as BootstrapNavBar,
  NavDropdown,
} from 'react-bootstrap';
import Link from 'next/link';
import TheaterLinks from './theaterLinks';

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
              <NavDropdown title="영화관" id="theater-nav-dropdown">
                <TheaterLinks />
              </NavDropdown>
              <NavDropdown title="스페셜관" id="special-screen-nav-dropdown">
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
                <a href="/admin">관리자</a>
              </Nav.Link>
            </Nav>
          </BootstrapNavBar.Collapse>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
}
