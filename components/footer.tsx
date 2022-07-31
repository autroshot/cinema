import Image from 'next/image';
import logo from '../public/logoWithTextGray.png';
import { Container } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <Container>
      <div>
        <Image src={logo} alt="시네마 로고" />
      </div>
    </Container>
  );
}
