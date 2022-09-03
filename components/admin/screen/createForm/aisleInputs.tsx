import { FormInputs } from 'pages/admin/screens/[theaterId]/create';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import {
  Control,
  FieldArrayWithId,
  FieldErrorsImpl,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import DeleteButton from './deleteButton';
import styles from './common.module.css';
import AddButton from './addButton';

export default function AisleInputs(props: Props) {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'aisles',
  });
  const { errors } = useFormState({ control: props.control, name: 'aisles' });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Row className="mt-3" key={field.id}>
            <Col>
              <FloatingLabel controlId="aisleType" label="통로 유형">
                <Form.Select
                  aria-label="통로 유형 항목"
                  {...props.register(`aisles.${index}.typeId`)}
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
                  isInvalid={Boolean(errors.aisles?.[index]?.no)}
                />
                <Form.Control.Feedback type="invalid" className="fs-6">
                  {errors.aisles?.[index]?.no?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col xs={1} className={styles.fixedHeight}>
              <div
                onClick={() => remove(index)}
                className="h-100 d-flex align-items-center justify-content-center"
              >
                <DeleteButton />
              </div>
            </Col>
          </Row>
        );
      })}
      <div className="d-grid" onClick={() => append({ typeId: 1, no: null })}>
        <AddButton />
      </div>
    </>
  );
}

interface Props {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
}
