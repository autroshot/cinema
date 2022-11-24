import { FormInputs } from 'components/common/screenForm';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  useFormState,
  UseFormTrigger,
} from 'react-hook-form';
import DeleteButton from './deleteButton';
import styles from './common.module.css';
import AddButton from './addButton';
import NumberInputWithFloatingLabel from './numberInputWithFloatingLabel';

export default function AisleInputs({ control, register, trigger }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'aisles',
  });
  const { errors } = useFormState({ control: control, name: 'aisles' });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Row className="mt-3" key={field.id}>
            <Col>
              <FloatingLabel
                controlId="aisleType"
                label="통로 유형"
                onChange={() => trigger('aisles')}
              >
                <Form.Select
                  aria-label="통로 유형 항목"
                  {...register(`aisles.${index}.typeId`)}
                >
                  <option value="1">row</option>
                  <option value="2">column</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <NumberInputWithFloatingLabel
                controlId="aisleNo"
                label="해당 번호"
                min="2"
                name={`aisles.${index}.no`}
                register={register}
                error={errors.aisles?.[index]?.no?.message}
              />
            </Col>
            <Col xs={1} className={styles.fixedHeight}>
              <div
                onClick={() => remove(index)}
                className="h-100 d-flex align-items-center justify-content-center"
                data-cy="deleteAisleInput"
              >
                <DeleteButton />
              </div>
            </Col>
          </Row>
        );
      })}
      <div
        className="d-grid"
        onClick={() => append({ typeId: '1', no: null })}
        data-cy="addAisleInput"
      >
        <AddButton />
      </div>
    </>
  );
}

interface Props {
  control: Control<FormInputs, any>;
  register: UseFormRegister<FormInputs>;
  trigger: UseFormTrigger<FormInputs>;
}
