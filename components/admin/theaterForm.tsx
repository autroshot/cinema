import Link from 'next/link';
import { TheaterFormValues } from 'pages/admin/theaters/create';
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import MyAlert from './myAlert';
import styles from './theaterForm.module.css';

export default function TheaterForm(props: Props) {
  return (
    <form onSubmit={props.onSubmit}>
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
          {props.id ? (
            <tr>
              <td>
                <label htmlFor="id">id</label>
              </td>
              <td>
                <span id="id">{props.id}</span>
              </td>
            </tr>
          ) : null}
          <tr>
            <td>
              <label htmlFor="name">name</label>
            </td>
            <td>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={50}
                placeholder="필숫값"
                className="w-100"
                value={props.values.name}
                onChange={props.onChange}
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
                maxLength={200}
                placeholder="필숫값"
                className="w-100"
                value={props.values.street_address}
                onChange={props.onChange}
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
                maxLength={1000}
                placeholder="필숫값"
                className="w-100"
                value={props.values.kakao_map_id}
                onChange={props.onChange}
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
                maxLength={1000}
                rows={10}
                className="w-100"
                value={props.values.subway}
                onChange={props.onChange}
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
                maxLength={1000}
                className="w-100"
                rows={10}
                value={props.values.bus}
                onChange={props.onChange}
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
                maxLength={1000}
                className="w-100"
                rows={10}
                value={props.values.car}
                onChange={props.onChange}
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
                maxLength={1000}
                className="w-100"
                rows={10}
                value={props.values.parking}
                onChange={props.onChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      {props.alert ? (
        <Row>
          <Col>
            <MyAlert message={props.alert} />
          </Col>
        </Row>
      ) : null}
      <Row className="mb-3">
        <Col>
          <Button type="submit" disabled={props.loading}>
            {props.loading ? (
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
              <>{props.id ? '업데이트' : '등록'}</>
            )}
          </Button>
          {props.id ? (
            <Button type="button" className="ms-3">
              삭제
            </Button>
          ) : null}
          <Link href="/admin/theaters">
            <Button type="button" variant="secondary" className="ms-3">
              취소
            </Button>
          </Link>
        </Col>
      </Row>
    </form>
  );
}

interface Props {
  id?: number;
  values: TheaterFormValues;
  alert: null | string;
  loading: boolean;
  onChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
