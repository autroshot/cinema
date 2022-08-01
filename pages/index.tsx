import Head from 'next/head';
import { Container } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../styles/Home.module.css';
import TrailerCarousel from '../components/trailerCarousel';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>시네마</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className="p-0">
        <TrailerCarousel />
        {/* <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal> */}
      </Container>
    </div>
  );
}
