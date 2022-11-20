import { Button } from 'react-bootstrap';
import CancelButton from './cancelButton';
import MySpinner from './mySpinner';

export default function UDButtons({
  url,
  disabled = false,
  processing,
  onDeleteButtonClick,
}: Props) {
  return (
    <>
      <Button type="submit" disabled={disabled || processing} data-cy="update">
        {processing ? <MySpinner /> : <>수정</>}
      </Button>
      <Button
        type="button"
        className="ms-3"
        disabled={disabled || processing}
        onClick={onDeleteButtonClick}
        data-cy="delete"
      >
        {processing ? <MySpinner /> : <>삭제</>}
      </Button>
      <CancelButton url={url} />
    </>
  );
}

interface Props {
  url: string;
  disabled?: boolean;
  processing: boolean;
  onDeleteButtonClick: () => void;
}
