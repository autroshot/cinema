import Contents from 'components/admin/screen/index/contents';
import { Container, Table } from 'react-bootstrap';

export default function Index() {
  return (
    <Container className="my-3">
      <h3 data-cy="title">영화관 및 상영관 목록</h3>
      <Table bordered hover>
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
    </Container>
  );
}

Index.isAdminPage = true;
