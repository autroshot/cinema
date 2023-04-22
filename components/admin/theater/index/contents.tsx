import { triggerClickWhenEnterKeyDown } from 'components/admin/common/functions';
import Link from 'next/link';
import type {
  GetRequestData,
  GetResponseData,
} from 'pages/api/theaters/index.page';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './contents.module.css';

export default function Contents() {
  const [theaters, setTheaters] = useState<null | GetResponseData>(null);

  useEffect(() => {
    const orderBy: GetRequestData = { id: 'asc' };
    const queryString = new URLSearchParams(orderBy).toString();

    fetch(`/api/theaters?${queryString}`)
      .then((res) => res.json())
      .then((theaters: GetResponseData) => {
        setTheaters(theaters);
      });
  }, []);

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
    return <>
      {theaters.map((theater) => {
        return (
          <Link key={theater.id} href={`/admin/theaters/${theater.id}`} legacyBehavior>
            <tr
              role="link"
              className={styles.cursorPointer}
              tabIndex={0}
              onKeyDown={triggerClickWhenEnterKeyDown}
            >
              <td>{theater.id}</td>
              <td>{theater.name}</td>
            </tr>
          </Link>
        );
      })}
    </>;
  }
}
