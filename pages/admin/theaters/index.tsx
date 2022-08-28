import Contents from 'components/admin/theater/index/contents';
import Link from 'next/link';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

export default function Index() {
  return (
    <Container className="my-3">
      <h3 data-cy="title">영화관 목록</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody data-cy="theaters">
          <Contents />
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
