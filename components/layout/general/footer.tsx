import Image from 'next/image';
import logo from 'public/logos/site-with-text-gray.png';
import { Container } from 'react-bootstrap';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <Container className="py-5">
      <footer>
        <div className="mb-3">
          <Image src={logo} alt="시네마 로고" />
        </div>
        <div>
          <a
            href="https://github.com/autroshot/cinema"
            target="_blank"
            rel="noreferrer"
            className={styles.gitHubIcon}
          />
        </div>
      </footer>
    </Container>
  );
}
