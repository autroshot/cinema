import { Button } from 'react-bootstrap';
import CancelButton from './cancelButton';
import MySpinner from './mySpinner';

export default function CButtons({ url, disabled = false, processing }: Props) {
  return (
    <>
      <Button type="submit" disabled={disabled} data-cy="submit">
        {processing ? <MySpinner /> : <>등록</>}
      </Button>
      <CancelButton url={url} />
    </>
  );
}

interface Props {
  url: string;
  disabled?: boolean;
  processing: boolean;
}
