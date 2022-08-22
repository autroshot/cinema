import NoticeModal from 'components/admin/noticeModal';
import TheaterForm from 'components/admin/theaterForm';
import { PostRequestData, PostResponseData } from 'pages/api/theaters';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

export default function CreateForm() {
  const [alert, setAlert] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [values, setValues] = useState<TheaterFormValues>({
    name: '',
    street_address: '',
    kakao_map_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });

  return (
    <>
      <Container className="mt-4">
        <h3>영화관 상세</h3>
        <TheaterForm
          id={10}
          values={values}
          loading={loading}
          alert={alert}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
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

    const response = await fetch('/api/theaters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toRequestData(values)),
    });
    setLoading(false);

    if (response.status === 500) {
      const responseJson = (await response.json()) as PostResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 201) {
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

  function toRequestData(values: TheaterFormValues): PostRequestData {
    const result = { ...values } as PostRequestData;

    if (values.subway.length === 0) result.subway = null;
    if (values.bus.length === 0) result.bus = null;
    if (values.car.length === 0) result.car = null;
    if (values.parking.length === 0) result.parking = null;

    return result;
  }
}

export interface TheaterFormValues {
  name: string;
  street_address: string;
  kakao_map_id: string;
  subway: string;
  bus: string;
  car: string;
  parking: string;
}

CreateForm.isAdminPage = true;
