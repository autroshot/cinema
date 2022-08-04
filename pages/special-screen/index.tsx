import { Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import superPlexG from '../../public/images/special-screen/super-plex-g.jpg';
import colorium from '../../public/images/special-screen/colorium.jpg';
import cineCouple from '../../public/images/special-screen/cine-couple.jpg';

export default function Index() {
  return (
    <Container className="px-0 py-5">
      <h1>
        <b>
          Special <div className="ms-5">Theater For You</div>
        </b>
      </h1>
      <h5 className="ms-3 mt-3">영화의 순간을 더욱 특별하게</h5>
      <div className="mt-5 d-flex justify-content-around flex-wrap">
        <Card className="mb-4 mb-lg-0">
          <Image src={superPlexG} alt="수퍼플렉스G" />
          <Card.Body>
            <Card.Title>수퍼플렉스G</Card.Title>
            <Card.Text>기네스북이 인정한 세계 최대 스케일</Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-4 mb-lg-0">
          <Image src={superPlexG} alt="수퍼플렉스G" />
          <Card.Body>
            <Card.Title>수퍼플렉스G</Card.Title>
            <Card.Text>기네스북이 인정한 세계 최대 스케일</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Image src={superPlexG} alt="수퍼플렉스G" />
          <Card.Body>
            <Card.Title>수퍼플렉스G</Card.Title>
            <Card.Text>기네스북이 인정한 세계 최대 스케일</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
