import { FloatingLabel, Form } from 'react-bootstrap';
import { Path, UseFormRegister } from 'react-hook-form';

export default function NumberInputWithFloatingLabel<TFormValues>({
  controlId,
  label,
  min,
  readOnly,
  name,
  register,
  error,
  onChange,
}: Props<TFormValues>) {
  return (
    <FloatingLabel controlId={controlId} label={label} onChange={onChange}>
      <Form.Control
        type="number"
        min={min}
        placeholder="1"
        readOnly={readOnly}
        {...register(name)}
        isInvalid={Boolean(error)}
      />
      <Form.Control.Feedback type="invalid" className="fs-6" data-cy="error">
        {error}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

interface Props<TFormInputs> {
  controlId: string;
  label: string;
  min: string;
  readOnly?: boolean;
  name: Path<TFormInputs>;
  register: UseFormRegister<TFormInputs>;
  error: undefined | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
