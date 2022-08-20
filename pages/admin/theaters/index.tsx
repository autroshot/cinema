import Link from 'next/link';
import { GetRequestData, GetResponseData } from 'pages/api/theaters';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import styles from './index.module.css';

export default function Index() {
  const [theaters, setTheaters] = useState<null | GetResponseData>(null);

  useEffect(() => {
    const orderBy: GetRequestData = { id: 'asc' };
    const queryString = new URLSearchParams(orderBy).toString();

    fetch(`/api/theaters?${queryString}`)
      .then((res) => res.json())
      .then((theaters: GetResponseData) => {
        setTheaters(theaters);
      });
  }, []);

  let tableContent: JSX.Element | JSX.Element[];
  if (theaters === null) {
    tableContent = (
      <tr>
        <td colSpan={2} className="text-center">
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">불러오는 중...</span>
          </Spinner>
        </td>
      </tr>
    );
  } else if (theaters.length === 0) {
    tableContent = (
      <tr>
        <td colSpan={2} className="text-center">
          데이터가 없습니다.
        </td>
      </tr>
    );
  } else {
    tableContent = theaters.map((theater) => {
      return (
        <Link key={theater.id} href={`/admin/theaters/${theater.id}`}>
          <tr role="link" className={styles.cursorPointer}>
            <td>{theater.id}</td>
            <td>{theater.name}</td>
          </tr>
        </Link>
      );
    });
  }

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
          {tableContent}
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
