import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import styles from './specialScreenLinks.module.css';
import superPlexG from '../public/super-plex-g.png';
import colorium from '../public/colorium.png';
import super4D from '../public/super-4d.png';
import Link from 'next/link';

export default function SpecialScreenLinks() {
  return (
    <>
      <Row className={styles.border}>
        <Col className="d-flex p-0">
          <h5 className="me-auto">
            <b>스페셜관</b>
          </h5>
          <Link href="/special-screen/">더보기 &gt;</Link>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex mt-3">
          <a href="">
            <Image src={superPlexG} alt="수퍼플렉스G" />
          </a>
          <a href="" className="ms-5">
            <Image src={colorium} alt="컬러리움" />
          </a>
          <a href="" className="ms-5">
            <Image src={super4D} alt="수퍼4D" />
          </a>
        </Col>
      </Row>
    </>
  );
}
