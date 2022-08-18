import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap';
import styles from './detail.module.css';

export default function CreateForm() {
  const [values, setValues] = useState({
    name: '',
    street_address: '',
    kakao_map_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });

  return (
    <Container className="mt-4">
      <h3>새 영화관 등록</h3>
      <form>
        <Table className={styles.table}>
          <colgroup>
            <col className={styles.fieldCol} />
            <col className={styles.valueCol} />
          </colgroup>
          <thead>
            <tr>
              <th>필드</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">name</label>
              </td>
              <td>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-100"
                  value={values.name}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="street_address">street_address</label>
              </td>
              <td>
                <input
                  id="street_address"
                  name="street_address"
                  type="text"
                  className="w-100"
                  value={values.street_address}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="kakao_map_id">kakao_map_id</label>
              </td>
              <td>
                <input
                  id="kakao_map_id"
                  name="kakao_map_id"
                  type="text"
                  className="w-100"
                  value={values.kakao_map_id}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="subway">subway</label>
              </td>
              <td>
                <textarea
                  id="subway"
                  name="subway"
                  rows={10}
                  className="w-100"
                  value={values.subway}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="bus">bus</label>
              </td>
              <td>
                <textarea
                  id="bus"
                  name="bus"
                  className="w-100"
                  rows={10}
                  value={values.bus}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="car">car</label>
              </td>
              <td>
                <textarea
                  id="car"
                  name="car"
                  className="w-100"
                  rows={10}
                  value={values.car}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="parking">parking</label>
              </td>
              <td>
                <textarea
                  id="parking"
                  name="parking"
                  className="w-100"
                  rows={10}
                  value={values.parking}
                  onInput={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col>
            <Alert variant="warning">빈 칸이 있습니다.</Alert>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button type="submit">등록</Button>
            <Link href="/admin/theater">
              <Button type="button" variant="secondary" className="ms-3">
                취소
              </Button>
            </Link>
          </Col>
        </Row>
      </form>
    </Container>
  );

  function handleChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
}

CreateForm.isAdminPage = true;
