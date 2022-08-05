import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import styles from './specialScreenLinks.module.css';
import superPlexG from '../public/logos/special-screen/super-plex-g.png';
import colorium from '../public/logos/special-screen/colorium.png';
import cineCouple from '../public/logos/special-screen/cine-couple.png';
import Link from 'next/link';

export default function SpecialScreenLinks() {
  return (
    <>
      <Row className={styles.border}>
        <Col className="d-flex">
          <h5 className="me-auto">
            <b>스페셜관</b>
          </h5>
          <Link href="/special-screen/">
            <a>더보기 &gt;</a>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3 d-flex d-flex justify-content-between justify-content-lg-start">
          <Link href="/special-screen/super-plex-g">
            <a>
              <Image src={superPlexG} alt="수퍼플렉스G" />
            </a>
          </Link>
          <Link href="/special-screen/colorium">
            <a className="ms-lg-5">
              <Image src={colorium} alt="컬러리움" />
            </a>
          </Link>
          <Link href="/special-screen/cine-couple">
            <a className="ms-lg-5">
              <Image
                src={cineCouple}
                alt="씨네 커플"
                width={95.7}
                height={30}
              />
            </a>
          </Link>
        </Col>
      </Row>
    </>
  );
}
