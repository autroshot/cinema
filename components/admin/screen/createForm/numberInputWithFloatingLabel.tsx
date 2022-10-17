import { FloatingLabel, Form } from 'react-bootstrap';
import { UseFormRegister } from 'react-hook-form';

export default function NumberInputWithFloatingLabel({
  controlId,
  label,
  min,
  register,
  error,
}: Props) {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Control
        type="number"
        min={min}
        placeholder="1"
        {...register('no')}
        isInvalid={Boolean(error)}
      />
      <Form.Control.Feedback type="invalid" className="fs-6" data-cy="error">
        {error}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

interface Props {
  controlId: string;
  label: string;
  min: string;
  register: UseFormRegister<any>;
  error: undefined | string;
}
