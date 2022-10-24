import { Spinner } from 'react-bootstrap';

export default function ShowChildrenOrStatus({ status, children }: Props) {
  switch (status) {
    case 'showChildren':
      return <>{children}</>;
    case 'loading':
      return (
        <Spinner animation="border" size="sm" role="status">
          <span className="visually-hidden">불러오는 중...</span>
        </Spinner>
      );
    case 'noData':
      return <>데이터가 없습니다.</>;
    default:
      return <>잘못된 접근입니다.</>;
  }
}

interface Props {
  status: Status;
  children: JSX.Element;
}

export type Status = 'showChildren' | 'loading' | 'noData';
