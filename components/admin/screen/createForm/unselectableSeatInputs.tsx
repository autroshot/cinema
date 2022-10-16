import {
  FormInputs,
  UnselectableSeatTypes,
} from 'pages/admin/screens/[theaterId]/create.page';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import DeleteButton from './deleteButton';
import styles from './common.module.css';
import AddButton from './addButton';

export default function UnselectableSeatInputs({
  control,
  register,
  types,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'unselectableSeats',
  });
  const { errors } = useFormState({
    control: control,
    name: 'unselectableSeats',
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Row className="mt-3" key={field.id}>
            <Col>
              <FloatingLabel controlId="unselectableSeatType" label="좌석 유형">
                <Form.Select
                  aria-label="좌석 유형 항목"
                  {...register(`unselectableSeats.${index}.typeId`)}
                >
                  {types.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="row" label="행 번호">
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...register(`unselectableSeats.${index}.row`)}
                  isInvalid={Boolean(errors.unselectableSeats?.[index]?.row)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="fs-6"
                  data-cy="error"
                >
                  {errors.unselectableSeats?.[index]?.row?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="column" label="열 번호">
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...register(`unselectableSeats.${index}.column`)}
                  isInvalid={Boolean(errors.unselectableSeats?.[index]?.column)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="fs-6"
                  data-cy="error"
                >
                  {errors.unselectableSeats?.[index]?.column?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col xs={1} className={styles.fixedHeight}>
              <div
                onClick={() => remove(index)}
                className="h-100 d-flex align-items-center justify-content-center"
                data-cy="deleteUnselectableSeatInput"
              >
                <DeleteButton />
              </div>
            </Col>
          </Row>
        );
      })}
      <div
        className="d-grid"
        onClick={() => append({ typeId: 1, row: null, column: null })}
        data-cy="addUnselectableSeatInput"
      >
        <AddButton />
      </div>
    </>
  );
}

interface Props {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
  types: UnselectableSeatTypes;
}
