import Link from 'next/link';
import { GetRequestData, GetResponseData } from 'pages/api/theaters';
import { NavDropdown, Spinner } from 'react-bootstrap';
import useSWR from 'swr';

export default function TheaterLinks() {
  const orderBy: GetRequestData = { name: 'asc' };
  const queryString = new URLSearchParams(orderBy).toString();

  const { data, error } = useSWR<GetResponseData>(
    `/api/theaters?${queryString}`,
    (url) => fetch(url).then((res) => res.json())
  );

  if (error) return <>서버 오류</>;
  if (!data)
    return (
      <div className="text-center">
        <Spinner animation="border" size="sm" role="status">
          <span className="visually-hidden">불러오는 중...</span>
        </Spinner>
      </div>
    );
  return (
    <>
      {data.map((theater) => {
        return (
          <Link key={theater.id} href={`/theaters/${theater.id}`} passHref>
            <NavDropdown.Item>{theater.name}</NavDropdown.Item>
          </Link>
        );
      })}
    </>
  );
}
