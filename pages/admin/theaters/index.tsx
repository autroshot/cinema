import Theaters from 'components/admin/theater/index/theaters';
import Link from 'next/link';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

export default function Index() {
  return (
    <Container className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          <Theaters />
        </tbody>
      </Table>
      <Row>
        <Col>
          <Link href="/admin/theaters/create">
            <Button>영화관 등록</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

Index.isAdminPage = true;
