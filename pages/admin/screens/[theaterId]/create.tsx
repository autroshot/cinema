import { useRouter } from 'next/router';
import { PostRequestData } from 'pages/api/screens';
import { useState } from 'react';
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
  const [screen, setScreen] = useState<ScreenFormValues>({
    no: '',
    total_row: '',
    total_column: '',
  });

  const router = useRouter();
  const { theaterId } = router.query;

  return (
    <Container className="my-3">
      <form action="">
        <h3 data-cy="title">상영관 등록</h3>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="no" label="번호">
              <Form.Control
                name="no"
                type="number"
                value={screen.no}
                onChange={handleChange}
                min="1"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="total_row" label="행 개수">
              <Form.Control
                name="total_row"
                type="number"
                value={screen.total_row}
                onChange={handleChange}
                min="1"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="total_column" label="열 개수">
              <Form.Control
                name="total_column"
                type="number"
                value={screen.total_column}
                onChange={handleChange}
                min="1"
              />
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
                    <option value="row">row</option>
                    <option value="column">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="번호">
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
                    <option value="row">row</option>
                    <option value="column">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="번호">
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
                    <option value="row">row</option>
                    <option value="column">column</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="aisleNo" label="번호">
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
                    <option value="nonexistent">nonexistent</option>
                    <option value="unavailable">unavailable</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="rowNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="columnNo" type="number" />
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
                    <option value="nonexistent">nonexistent</option>
                    <option value="unavailable">unavailable</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="rowNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="columnNo" type="number" />
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
                    <option value="nonexistent">nonexistent</option>
                    <option value="unavailable">unavailable</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="rowNo" label="행 번호">
                  <Form.Control name="rowNo" type="number" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="columnNo" label="열 번호">
                  <Form.Control name="columnNo" type="number" />
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

        <Button>좌석 배치도 확인</Button>
        <div className="mb-3">좌석 배치도</div>
        <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
        <Button>등록</Button>
        <Button>취소</Button>
      </form>
    </Container>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setScreen((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
}

interface ScreenFormValues {
  no: string;
  total_row: string;
  total_column: string;
}

CreateForm.isAdminPage = true;
