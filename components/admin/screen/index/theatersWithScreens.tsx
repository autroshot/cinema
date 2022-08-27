import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function TheatersWithScreens() {
  const [theaters, setTheaters] = useState<null | GetResponseData>(null);

  useEffect(() => {}, []);

  if (theaters === null) {
    return (
      <tr>
        <td colSpan={2} className="text-center">
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">불러오는 중...</span>
          </Spinner>
        </td>
      </tr>
    );
  } else if (theaters.length === 0) {
    return (
      <tr>
        <td colSpan={2} className="text-center">
          데이터가 없습니다.
        </td>
      </tr>
    );
  } else {
    return <>상영관이 포함된 영화관들</>;
  }
}
