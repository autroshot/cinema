import {
  AisleFormValue,
  InvalidatedAisleInput,
} from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import DeleteButton from './deleteButton';

export default function AisleInputs(props: Props) {
  return (
    <>
      {props.aisles.map((aisle, index) => {
        return (
          <Row className="mt-3" key={index}>
            <Col>
              <FloatingLabel controlId="aisleType" label="통로 유형">
                <Form.Select
                  name="aisle_type_id"
                  aria-label="통로 유형 항목"
                  value={aisle.aisle_type_id}
                  onChange={(event) =>
                    props.onChange(
                      event as React.ChangeEvent<HTMLSelectElement>,
                      index
                    )
                  }
                >
                  <option value="1">row</option>
                  <option value="2">column</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="aisleNo" label="해당 번호">
                <Form.Control
                  name="no"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={aisle.no}
                  onChange={(event) =>
                    props.onChange(
                      event as React.ChangeEvent<HTMLInputElement>,
                      index
                    )
                  }
                  isInvalid={props.invalidatedAisleInputs[index].no}
                />
              </FloatingLabel>
            </Col>
            <Col
              xs={1}
              className="d-flex align-items-center justify-content-center"
            >
              <span onClick={() => props.onDelete(index)}>
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
  aisles: AisleFormValue[];
  invalidatedAisleInputs: InvalidatedAisleInput[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
  onDelete: (index: number) => void;
}