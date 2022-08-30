import { useRouter } from 'next/router';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import styles from './create.module.css';

export default function CreateForm() {
  const router = useRouter();
  const { theaterId } = router.query;

  return (
    <Container className="my-3">
      <form action="">
        <h3 data-cy="title">상영관 등록</h3>
        <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="no" label="번호">
              <Form.Control name="no" type="number" />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="row" label="행 개수">
              <Form.Control name="row" type="number" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="column" label="열 개수">
              <Form.Control name="column" type="number" />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <span>통로</span>
            <span className="material-symbols-outlined ms-1 fs-3" role="button">
              <span className={styles.add}>add_circle</span>
            </span>

            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="aisleType" label="통로 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">row</option>
                    <option value="2">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="행 또는 열의 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="aisleType" label="통로 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">row</option>
                    <option value="2">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="행 또는 열의 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="aisleType" label="통로 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">row</option>
                    <option value="2">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="행 또는 열의 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <span>선택 불가능한 좌석</span>
            <span className="material-symbols-outlined ms-1 fs-3" role="button">
              <span className={styles.add}>add_circle</span>
            </span>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="seatType" label="좌석 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">nonexist</option>
                    <option value="2">disabled</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="seatType" label="좌석 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">nonexist</option>
                    <option value="2">disabled</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <FloatingLabel controlId="seatType" label="좌석 유형">
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">nonexist</option>
                    <option value="2">disabled</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="aisleNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <span className="material-symbols-outlined fs-2" role="button">
                  <span className={styles.delete}>do_not_disturb_on</span>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="mb-3">좌석배치도</div>
        <Button>등록</Button>
        <Button>취소</Button>
      </form>
    </Container>
  );
}

CreateForm.isAdminPage = true;
