import Image from 'next/image';
import logo from '../public/logoWithTextGray.png';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <Container>
      <footer>
        <div>
          <Image src={logo} alt="시네마 로고" />
        </div>
        <div>
          <a href="https://github.com/autroshot/cinema">GitHub 링크</a>
        </div>
      </footer>
    </Container>
  );
}
