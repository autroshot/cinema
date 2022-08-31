import { UnselectableSeatFormValue } from 'pages/admin/screens/[theaterId]/create';
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
                <Form.Select
                  name="unselectable_seat_type_id"
                  aria-label="좌석 유형 항목"
                  value={unselectableSeat.unselectable_seat_type_id}
                  onChange={(event) =>
                    props.onChange(
                      event as React.ChangeEvent<HTMLSelectElement>,
                      index
                    )
                  }
                >
                  <option value="1">nonexistent</option>
                  <option value="2">unavailable</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="row" label="행 번호">
                <Form.Control
                  name="row"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={unselectableSeat.row}
                  onChange={(event) =>
                    props.onChange(
                      event as React.ChangeEvent<HTMLInputElement>,
                      index
                    )
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="column" label="열 번호">
                <Form.Control
                  name="column"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={unselectableSeat.column}
                  onChange={(event) =>
                    props.onChange(
                      event as React.ChangeEvent<HTMLInputElement>,
                      index
                    )
                  }
                />
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
  unselectableSeats: UnselectableSeatFormValue[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
}
