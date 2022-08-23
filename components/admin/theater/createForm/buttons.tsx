import Link from 'next/link';
import { Button, Spinner } from 'react-bootstrap';

export default function Buttons(props: Props) {
  return (
    <>
      <Button type="submit" disabled={props.loading}>
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
      <Link href="/admin/theaters">
        <Button type="button" variant="secondary" className="ms-3">
          취소
        </Button>
      </Link>
    </>
  );
}

interface Props {
  loading: boolean;
}
