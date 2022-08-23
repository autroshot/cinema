import { theater } from '@prisma/client';
import ConfirmModal from 'components/admin/confirmModal';
import MyAlert from 'components/admin/myAlert';
import NoticeModal from 'components/admin/noticeModal';
import TheaterContent from 'components/admin/theaterContent';
import TheaterForm from 'components/admin/theaterForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PostRequestData, PostResponseData } from 'pages/api/theaters';
import { GetResponseData } from 'pages/api/theaters/[id]';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
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
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  return (
    <>
      <Container className="my-3">
        <form onSubmit={handleSubmit}>
          <h3>영화관 상세</h3>
          <TheaterContent loading={loadingTheater} noData={id === -1}>
            <>
              <TheaterForm id={id} values={values} onChange={handleChange} />
              {alert ? <MyAlert message={alert} /> : null}
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                    처리 중...
                  </>
                ) : (
                  <>수정</>
                )}
              </Button>
              <Button
                type="button"
                className="ms-3"
                onClick={handleDeleteButtonClick}
              >
                {processing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                    처리 중...
                  </>
                ) : (
                  <>삭제</>
                )}
              </Button>
              <Link href="/admin/theaters">
                <Button type="button" variant="secondary" className="ms-3">
                  취소
                </Button>
              </Link>
            </>
          </TheaterContent>
        </form>
      </Container>
      <NoticeModal
        show={showCompleteModal}
        bodyText="수정이 완료되었습니다."
        href="/admin/theaters"
        linkText="목록으로 돌아가기"
        onClose={handleClose}
      />
      <ConfirmModal
        contentName={values.name}
        show={showConfirmModal}
        onClose={handleConfirmModalClose}
        onDelete={handleDelete}
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
    setProcessing(true);

    const response = await fetch(`/api/theaters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toRequestData(values)),
    });
    setProcessing(false);

    if (response.status === 500) {
      const responseJson = (await response.json()) as PostResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 204) {
      setShowCompleteModal(true);
      return;
    }
  }

  async function handleDelete() {
    setProcessing(true);
    const response = await fetch(`/api/theaters/${id}`, {
      method: 'DELETE',
    });
    setProcessing(false);

    if (response.status === 500) {
      const responseJson = (await response.json()) as PostResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 204) {
      setShowCompleteModal(true);
      return;
    }
  }

  function handleClose() {
    setShowCompleteModal(false);
  }

  function handleConfirmModalClose() {
    setShowConfirmModal(false);
  }

  function handleDeleteButtonClick() {
    setShowConfirmModal(true);
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
