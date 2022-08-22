import { theater } from '@prisma/client';
import NoticeModal from 'components/admin/noticeModal';
import TheaterForm from 'components/admin/theaterForm';
import { useRouter } from 'next/router';
import { PostRequestData, PostResponseData } from 'pages/api/theaters';
import { GetResponseData } from 'pages/api/theaters/[id]';
import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { TheaterFormValues } from './create';

export default function CreateForm() {
  const [id, setId] = useState(-1);
  const [values, setValues] = useState<TheaterFormValues>({
    name: '',
    street_address: '',
    kakao_map_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });
  const [loadingTheater, setLoadingTheater] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);
  const [completed, setCompleted] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!router.query.id) return;

    const queryId = +(router.query.id as string);
    fetch(`/api/theaters/${queryId}`)
      .then((res) => res.json())
      .then((theater: GetResponseData) => {
        if (theater === null) {
          setLoadingTheater(false);
        } else {
          setValues(toFormValues(theater));
          setId(queryId);
          setLoadingTheater(false);
        }
      });
  }, [router.query.id]);

  let content: JSX.Element;
  if (loadingTheater) {
    content = (
      <Spinner animation="border" size="sm" role="status">
        <span className="visually-hidden">불러오는 중...</span>
      </Spinner>
    );
  } else if (id === -1) {
    content = <>데이터가 없습니다.</>;
  } else {
    content = (
      <TheaterForm
        id={id}
        values={values}
        loading={loading}
        alert={alert}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h3>영화관 상세</h3>
        {content}
      </Container>
      <NoticeModal
        show={completed}
        href="/admin/theaters"
        linkText="목록으로 돌아가기"
        onClose={handleClose}
      />
    </>
  );

  function handleChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate(values)) {
      setAlert('필숫값이 비어 있습니다.');
      return;
    }
    setAlert(null);
    setLoading(true);

    const response = await fetch(`/api/theaters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toRequestData(values)),
    });
    setLoading(false);

    if (response.status === 500) {
      const responseJson = (await response.json()) as PostResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 204) {
      setCompleted(true);
      return;
    }
  }

  function handleClose() {
    setCompleted(false);
  }

  function validate(values: TheaterFormValues) {
    return (
      values.name.length !== 0 &&
      values.street_address.length !== 0 &&
      values.kakao_map_id.length !== 0
    );
  }

  function toFormValues(theater: theater) {
    const result = { ...theater };

    if (theater.subway === null) result.subway = '';
    if (theater.bus === null) result.bus = '';
    if (theater.car === null) result.car = '';
    if (theater.parking === null) result.parking = '';

    return result as TheaterFormValues;
  }

  function toRequestData(values: TheaterFormValues): PostRequestData {
    const result = { ...values } as PostRequestData;

    if (values.subway.length === 0) result.subway = null;
    if (values.bus.length === 0) result.bus = null;
    if (values.car.length === 0) result.car = null;
    if (values.parking.length === 0) result.parking = null;

    return result;
  }
}

CreateForm.isAdminPage = true;
