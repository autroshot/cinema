import Link from 'next/link';
import { Button, Spinner } from 'react-bootstrap';

export default function Buttons(props: Props) {
  return (
    <>
      <Button type="submit" disabled={props.processing}>
        {props.processing ? (
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
        ) : (
          <>수정</>
        )}
      </Button>
      <Button
        type="button"
        className="ms-3"
        onClick={props.onDeleteButtonClick}
      >
        {props.processing ? (
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
        ) : (
          <>삭제</>
        )}
      </Button>
      <Link href="/admin/theaters">
        <Button type="button" variant="secondary" className="ms-3">
          취소
        </Button>
      </Link>
    </>
  );
}

interface Props {
  processing: boolean;
  onDeleteButtonClick: () => void;
}
