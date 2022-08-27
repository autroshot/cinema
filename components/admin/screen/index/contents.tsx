import Link from 'next/link';
import { GetResponseData } from 'pages/api/screens';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function Contents() {
  const [theatersIncludingScreens, setTheatersIncludingScreens] =
    useState<GetResponseData | null>(null);
  console.log(theatersIncludingScreens);

  useEffect(() => {
    fetch('/api/screens')
      .then((res) => res.json())
      .then((data: GetResponseData) => {
        setTheatersIncludingScreens(data);
      });
  }, []);

  if (theatersIncludingScreens === null) {
    return (
      <tr>
        <td colSpan={2} className="text-center">
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">불러오는 중...</span>
          </Spinner>
        </td>
      </tr>
    );
  } else if (theatersIncludingScreens.length === 0) {
    return (
      <tr>
        <td colSpan={2} className="text-center">
          데이터가 없습니다.
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td colSpan={2} className="text-center">
          상영관들이 포함된 영화관들
        </td>
      </tr>
    );
  }
}
