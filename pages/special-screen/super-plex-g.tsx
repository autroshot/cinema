import { Col, Container, Row } from 'react-bootstrap';
import styles from './super-plex-g.module.css';
import Image from 'next/image';
import logo from '../../public/logos/special-screen/super-plex-g-white.png';
import Link from 'next/link';

export default function SuperPlexG() {
  return (
    <>
      <Container fluid className="position-relative p-0 bg-black">
        <div className="d-flex justify-content-center">
          <video
            className={styles.video}
            src="/videos/video-super-plex-g.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100">
          <Container className="h-100 d-flex flex-column">
            <div className="mt-auto mb-3">
              <Image src={logo} alt="수퍼플렉스G" />
              <h5 className="text-white mt-3 ms-5">
                기네스북이 인정한 세계 최대 스케일
              </h5>
            </div>
          </Container>
        </div>
      </Container>
      <Container className="my-5">
        <Row className="mb-2">
          <Col>
            <h5>
              <b>수퍼플렉스G 상영시간표</b>
            </h5>
          </Col>
        </Row>
        <section className={styles.theaters}>
          <Row className="row-cols-3 row-cols-lg-6 g-0">
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Col className="col py-3 border">월드타워</Col>
              </a>
            </Link>
          </Row>
        </section>
      </Container>
    </>
  );
}
