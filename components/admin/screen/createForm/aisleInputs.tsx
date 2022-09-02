import {
  AisleFormValue,
  FormInputs,
  InvalidatedAisleInput,
} from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import DeleteButton from './deleteButton';

export default function AisleInputs(props: Props) {
  return (
    <>
      {props.fields.map((field, index) => {
        return (
          <Row className="mt-3" key={field.id}>
            <Col>
              <FloatingLabel controlId="aisleType" label="통로 유형">
                <Form.Select
                  aria-label="통로 유형 항목"
                  {...props.register(`aisles.${index}.type`)}
                >
                  <option value="1">row</option>
                  <option value="2">column</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="aisleNo" label="해당 번호">
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="1"
                  {...props.register(`aisles.${index}.no`)}
                />
              </FloatingLabel>
            </Col>
            <Col
              xs={1}
              className="d-flex align-items-center justify-content-center"
            >
              <span onClick={() => console.log('통로 input 삭제 버튼 클릭됨')}>
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
  register: UseFormRegister<FormInputs>;
  fields: FieldArrayWithId<FormInputs, 'aisles', 'id'>[];
}
