import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logos/site-with-text-gray.png';
import { Container, Stack } from 'react-bootstrap';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <Container className="py-3">
      <footer>
        <Stack direction="horizontal" gap={3}>
          <Link href="/">

            <Image src={logo} alt="시네마 로고" />

          </Link>
          <a
            href="https://github.com/autroshot/cinema"
            target="_blank"
            rel="noreferrer"
          >
            <svg className={styles.gitHubIcon} aria-label="깃허브" />
          </a>
        </Stack>
      </footer>
    </Container>
  );
}
