import {
  FormInputs,
  UnselectableSeatFormValue,
} from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import {
  FieldArrayWithId,
  FieldErrorsImpl,
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
                  isInvalid={Boolean(
                    props.errors.unselectableSeats?.[index]?.row
                  )}
                />
                <Form.Control.Feedback type="invalid" className="fs-6">
                  {props.errors.unselectableSeats?.[index]?.row?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="column" label="열 번호">
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...props.register(`unselectableSeats.${index}.column`)}
                  isInvalid={Boolean(
                    props.errors.unselectableSeats?.[index]?.column
                  )}
                />
                <Form.Control.Feedback type="invalid" className="fs-6">
                  {props.errors.unselectableSeats?.[index]?.column?.message}
                </Form.Control.Feedback>
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
  errors: FieldErrorsImpl<{
    no: number;
    totalRow: number;
    totalColumn: number;
    aisles: {
      typeId: number;
      no: number;
    }[];
    unselectableSeats: {
      typeId: number;
      row: number;
      column: number;
    }[];
  }>;
  register: UseFormRegister<FormInputs>;
  onRemove: UseFieldArrayRemove;
}
