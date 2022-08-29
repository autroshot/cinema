import Link from 'next/link';
import type { GetResponseData } from 'pages/api/screens';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import styles from './contents.module.css';
import TheaterAndScreensLayout from './theaterAndScreensLayout';

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
            <TheaterAndScreensLayout
              key={theaterIncludingScreens.id}
              theaterIncludingScreens={theaterIncludingScreens}
            />
          );
        })}
      </>
    );
  }
}
