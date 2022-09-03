import {
  FormInputs,
  UnselectableSeatFormValue,
} from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import DeleteButton from './deleteButton';

export default function UnselectableSeatInputs(props: Props) {
  return (
    <>
      {props.fields.map((field, index) => {
        return (
          <Row className="mt-3" key={field.id}>
            <Col>
              <FloatingLabel controlId="seatType" label="좌석 유형">
                <Form.Select
                  aria-label="좌석 유형 항목"
                  {...props.register(`unselectableSeats.${index}.typeId`)}
                >
                  <option value="1">nonexistent</option>
                  <option value="2">unavailable</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="row" label="행 번호">
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...props.register(`unselectableSeats.${index}.row`)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="column" label="열 번호">
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...props.register(`unselectableSeats.${index}.column`)}
                />
              </FloatingLabel>
            </Col>
            <Col
              xs={1}
              className="d-flex align-items-center justify-content-center"
            >
              <span onClick={() => props.onRemove(index)}>
                <DeleteButton />
              </span>
            </Col>
          </Row>
        );
      })}
    </>
  );
}

interface Props {
  fields: FieldArrayWithId<FormInputs, 'unselectableSeats', 'id'>[];
  register: UseFormRegister<FormInputs>;
  onRemove: UseFieldArrayRemove;
}
