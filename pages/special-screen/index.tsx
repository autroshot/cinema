import Image from 'next/image';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Index() {
  return (
    <Container className="px-0 py-5">
      <h1>
        <b>
          Special <div className="ms-5">Theater For You</div>
        </b>
      </h1>
      <h5 className="ms-3 mt-3">영화의 순간을 더욱 특별하게</h5>
      <Row>
        <Col>
          <Card></Card>
        </Col>
      </Row>
    </Container>
  );
}
