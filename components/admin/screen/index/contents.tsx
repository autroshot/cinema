import Link from 'next/link';
import type { GetResponseData } from 'pages/api/screens';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Stack } from 'react-bootstrap';
import styles from './contents.module.css';

export default function Contents() {
  const [theatersIncludingScreens, setTheatersIncludingScreens] =
    useState<GetResponseData | null>(null);

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
      <>
        {theatersIncludingScreens.map((theaterIncludingScreens) => {
          return (
            <React.Fragment key={theaterIncludingScreens.id}>
              <tr role="button" className={styles.cursorPointer}>
                <td>{theaterIncludingScreens.id}</td>
                <td className="d-flex">
                  {theaterIncludingScreens.name}
                  <span className="material-symbols-outlined ms-auto">
                    expand_less
                  </span>
                </td>
              </tr>
              <tr role="link">
                <td colSpan={2} className="text-center">
                  <Stack direction="horizontal" gap={4} className="mx-2">
                    {theaterIncludingScreens.screens.map((screen) => {
                      return <div key={screen.no}>{screen.no}관</div>;
                    })}
                    <Button size="sm" className="ms-auto">
                      새 상영관 생성
                    </Button>
                  </Stack>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </>
    );
  }
}
