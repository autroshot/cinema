import { Container, Table } from 'react-bootstrap';

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
          <tr>
            <td>100</td>
            <td>월드타워</td>
          </tr>
          <tr>
            <td>101</td>
            <td>수원</td>
          </tr>
          <tr>
            <td>102</td>
            <td>건대입구</td>
          </tr>
          <tr>
            <td>103</td>
            <td>노원</td>
          </tr>
          <tr>
            <td>104</td>
            <td>김포공항</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

Index.isAdminPage = true;
