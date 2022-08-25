import Image from 'next/image';
import logo from 'public/logos/site-with-text-gray.png';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container className="py-5">
      <footer>
        <div className="mb-3">
          <Image src={logo} alt="시네마 로고" />
        </div>
        <div>
          <a href="https://github.com/autroshot/cinema">GitHub 링크</a>
        </div>
      </footer>
    </Container>
  );
}
