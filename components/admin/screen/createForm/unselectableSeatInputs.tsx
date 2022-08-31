import { UnselectableSeatFormValues } from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import DeleteButton from './deleteButton';

export default function UnselectableSeatInputs(props: Props) {
  return (
    <>
      {props.unselectableSeats.map((unselectableSeat, index) => {
        return (
          <Row className="mt-3" key={index}>
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
              <DeleteButton />
            </Col>
          </Row>
        );
      })}
    </>
  );
}

interface Props {
  unselectableSeats: UnselectableSeatFormValues;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
}
