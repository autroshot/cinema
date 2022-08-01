import Image from 'next/image';
import logo from '../public/logo-with-text-gray.png';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container>
      <footer>
        <div className="mt-5">
          <Image src={logo} alt="시네마 로고" />
        </div>
        <div>
          <a href="https://github.com/autroshot/cinema">GitHub 링크</a>
        </div>
      </footer>
    </Container>
  );
}
