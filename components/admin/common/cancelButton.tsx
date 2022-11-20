import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function CancelButton({ url }: Props) {
  return (
    <Link href={url}>
      <Button
        type="button"
        variant="secondary"
        className="ms-3"
        data-cy="cancel"
      >
        취소
      </Button>
    </Link>
  );
}

interface Props {
  url: string;
}
