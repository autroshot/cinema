import { Spinner } from 'react-bootstrap';

export default function TheaterContent(props: Props) {
  if (props.loading) {
    return (
      <Spinner animation="border" size="sm" role="status">
        <span className="visually-hidden">불러오는 중...</span>
      </Spinner>
    );
  } else if (props.noData) {
    return <>데이터가 없습니다.</>;
  } else {
    return <>{props.children}</>;
  }
}

interface Props {
  loading: boolean;
  noData: boolean;
  children: JSX.Element;
}
