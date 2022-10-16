import Link from 'next/link';
import { Button, Spinner } from 'react-bootstrap';

export default function BottomButtons(props: Props) {
  return (
    <>
      <Button type="submit" disabled={props.disabled} data-cy="submit">
        {props.loading ? (
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
          <>등록</>
        )}
      </Button>
      <Link href="/admin/screens">
        <Button
          type="button"
          variant="secondary"
          className="ms-3"
          data-cy="cancel"
        >
          취소
        </Button>
      </Link>
    </>
  );
}

interface Props {
  disabled: boolean;
  loading: boolean;
}
