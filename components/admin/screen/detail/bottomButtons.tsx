import Link from 'next/link';
import { Button, Spinner } from 'react-bootstrap';

export default function BottomButtons({
  isValid,
  processing,
  onDeleteButtonClick,
}: Props) {
  return (
    <>
      <Button type="submit" disabled={!isValid || processing}>
        {processing ? (
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
        disabled={!isValid || processing}
        onClick={onDeleteButtonClick}
      >
        {processing ? (
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
  isValid: boolean;
  processing: boolean;
  onDeleteButtonClick: () => void;
}
