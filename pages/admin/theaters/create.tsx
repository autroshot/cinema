import MyAlert from 'components/admin/myAlert';
import NoticeModal from 'components/admin/noticeModal';
import Link from 'next/link';
import { RequestData, ResponseData } from 'pages/api/theaters';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import styles from './detail.module.css';

export default function CreateForm() {
  const [alert, setAlert] = useState<null | string>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [values, setValues] = useState<RequestData>({
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
                    placeholder="필숫값"
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
                    placeholder="필숫값"
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
                    placeholder="필숫값"
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
          {alert ? (
            <Row>
              <Col>
                <MyAlert message={alert} />
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
      <NoticeModal show={showCompletion} onClose={handleClose} />
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

    if (!validate(values)) {
      setAlert('필숫값이 비어 있습니다.');
      return;
    }
    setAlert(null);
    setShowLoading(true);

    const requestJson = JSON.stringify(values);
    const response = await fetch('/api/theaters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestJson,
    });
    setShowLoading(false);

    if (response.status === 500) {
      const responseJson = (await response.json()) as ResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 201) {
      setShowCompletion(true);
      return;
    }
  }

  function handleClose() {
    setShowCompletion(false);
  }

  function validate(values: RequestData) {
    return (
      values.name.length !== 0 &&
      values.street_address.length !== 0 &&
      values.kakao_map_id.length !== 0
    );
  }
}

CreateForm.isAdminPage = true;
