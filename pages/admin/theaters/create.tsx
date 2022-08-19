import { Prisma } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import styles from './detail.module.css';

export default function CreateForm() {
  const [showWarning, setShowWarning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [values, setValues] = useState<Values>({
    name: '',
    street_address: '',
    kakao_map_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });

  return (
    <>
      <Container className="mt-4">
        <h3>영화관 등록</h3>
        <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {showWarning ? (
            <Row>
              <Col>
                <Alert variant="warning">
                  <span className="material-symbols-rounded me-1">
                    <span className={styles.warning}>warning</span>
                  </span>
                  빈 칸이 있습니다.
                </Alert>
              </Col>
            </Row>
          ) : null}
          <Row className="mb-3">
            <Col>
              <Button type="submit" disabled={showLoading}>
                {showLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                    처리 중...
                  </>
                ) : (
                  <>등록</>
                )}
              </Button>
              <Link href="/admin/theaters">
                <Button type="button" variant="secondary" className="ms-3">
                  취소
                </Button>
              </Link>
            </Col>
          </Row>
        </form>
      </Container>
      <Modal
        size="sm"
        show={showCompletion}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>등록이 완료되었습니다.</Modal.Body>
        <Modal.Footer className="justify-content-center p-2">
          <Button variant="primary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate(Object.values(values))) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setShowLoading(true);
    const json = JSON.stringify(values);

    const response = await fetch('/api/theaters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json,
    });
    setShowLoading(false);

    if (response.status === 201) {
      setShowCompletion(true);
    }
  }

  function handleClose() {
    setShowCompletion(false);
  }

  function validate(values: string[]) {
    return !values.some((value) => value.length === 0);
  }

  interface Values extends Prisma.theaterCreateInput {
    subway: string;
    bus: string;
    car: string;
    parking: string;
  }
}

CreateForm.isAdminPage = true;
