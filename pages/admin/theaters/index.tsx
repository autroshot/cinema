import Link from 'next/link';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import styles from './index.module.css';

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
          <Link href="/admin/theaters/100">
            <tr role="link" className={styles.cursorPointer}>
              <td>100</td>
              <td>월드타워</td>
            </tr>
          </Link>
          <Link href="/admin/theaters/101">
            <tr role="link" className={styles.cursorPointer}>
              <td>101</td>
              <td>수원</td>
            </tr>
          </Link>
          <Link href="/admin/theaters/102">
            <tr role="link" className={styles.cursorPointer}>
              <td>102</td>
              <td>건대입구</td>
            </tr>
          </Link>
          <Link href="/admin/theaters/103">
            <tr role="link" className={styles.cursorPointer}>
              <td>103</td>
              <td>노원</td>
            </tr>
          </Link>
          <Link href="/admin/theaters/104">
            <tr role="link" className={styles.cursorPointer}>
              <td>104</td>
              <td>김포공항</td>
            </tr>
          </Link>
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
