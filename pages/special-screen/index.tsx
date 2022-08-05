import { Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import superPlexG from '../../public/images/special-screen/super-plex-g.jpg';
import colorium from '../../public/images/special-screen/colorium.jpg';
import cineCouple from '../../public/images/special-screen/cine-couple.jpg';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Head>
        <title>스페셜관 - 시네마</title>
      </Head>
      <Container className="px-0 py-5">
        <h1>
          <b>
            Special <div className="ms-5">Theater For You</div>
          </b>
        </h1>
        <h5 className="ms-3 mt-3">영화의 순간을 더욱 특별하게</h5>
        <div className="mt-5 d-flex justify-content-around flex-wrap">
          <Card className="mb-4 mb-lg-0 border-0">
            <Image src={superPlexG} alt="수퍼플렉스G" />
            <Card.Body>
              <Card.Title>수퍼플렉스G</Card.Title>
              <Card.Text>기네스북이 인정한 세계 최대 스케일</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4 mb-lg-0 border-0">
            <Image src={colorium} alt="컬러리움" />
            <Card.Body>
              <Card.Title>컬러리움</Card.Title>
              <Card.Text>세상의 모든 색으로 영화를 보다</Card.Text>
            </Card.Body>
          </Card>
          <Card className="border-0">
            <Image src={cineCouple} alt="씨네 커플" />
            <Card.Body>
              <Card.Title>씨네 커플</Card.Title>
              <Card.Text>연인을 위한 두근두근 커플석</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
