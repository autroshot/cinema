import { Spinner } from 'react-bootstrap';

export default function MySpinner() {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />{' '}
      처리 중...
    </>
  );
}
