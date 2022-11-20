import { theater } from '@prisma/client';
import ConfirmModal from 'components/admin/theater/detail/confirmModal';
import ShowChildrenOrStatus, {
  Status,
} from 'components/common/showChildrenOrStatus';
import MyAlert from 'components/admin/theater/myAlert';
import NoticeModal from 'components/admin/theater/noticeModal';
import TheaterForm from 'components/admin/theater/theaterForm';
import { useRouter } from 'next/router';
import type {
  PostRequestData,
  ErrorResponseData,
} from 'pages/api/theaters/index.page';
import type { GetResponseData } from 'pages/api/theaters/[theaterId]/index.page';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TheaterFormValues } from './create.page';
import UDButtons from 'components/admin/common/UDButtons';

export default function Detail() {
  const [id, setId] = useState<null | number>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [values, setValues] = useState<TheaterFormValues>({
    name: '',
    street_address: '',
    google_maps_place_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);
  const [completeType, setCompleteType] = useState<CompleteType>(null);
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
    useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!router.query.id) return;

    const queryId = Number(router.query.id as string);
    fetch(`/api/theaters/${queryId}`)
      .then((res) => res.json())
      .then((theater: GetResponseData) => {
        if (theater === null) {
          setStatus('noData');
        } else {
          setValues(toFormValues(theater));
          setId(queryId);
          setStatus('showChildren');
        }
      });
  }, [router.query.id]);

  return (
    <>
      <Container className="my-3" data-cy="container">
        <form onSubmit={handleUpdate}>
          <h3 data-cy="title">영화관 상세</h3>
          <ShowChildrenOrStatus status={status}>
            <>
              <TheaterForm
                id={Number(id)}
                values={values}
                onChange={handleChange}
              />
              {alert ? <MyAlert message={alert} /> : null}
              <UDButtons
                url="/admin/theaters"
                processing={processing}
                onDeleteButtonClick={() => setShowConfirmDeletionModal(true)}
              />
            </>
          </ShowChildrenOrStatus>
        </form>
      </Container>
      <NoticeModal
        show={completeType === 'update'}
        bodyText="수정이 완료되었습니다."
        href="/admin/theaters"
        linkText="목록으로 돌아가기"
        onClose={handleClose}
      />
      <NoticeModal
        show={completeType === 'delete'}
        bodyText="삭제가 완료되었습니다."
        href="/admin/theaters"
        linkText="목록으로 돌아가기"
      />
      <ConfirmModal
        contentName={`${values.name}점`}
        show={showConfirmDeletionModal}
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

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
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
      const responseJson = (await response.json()) as ErrorResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 204) {
      setCompleteType('update');
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
      const responseJson = (await response.json()) as ErrorResponseData;
      setAlert(responseJson.message);
      return;
    }
    if (response.status === 204) {
      setShowConfirmDeletionModal(false);
      setCompleteType('delete');
      return;
    }
  }

  function handleClose() {
    setCompleteType(null);
  }

  function handleConfirmModalClose() {
    setShowConfirmDeletionModal(false);
  }

  function handleDeleteButtonClick() {
    setShowConfirmDeletionModal(true);
  }

  function validate(values: TheaterFormValues) {
    return values.name.length !== 0 && values.street_address.length !== 0;
  }

  function toFormValues(theater: theater) {
    const result = { ...theater };

    if (theater.google_maps_place_id === null) result.google_maps_place_id = '';
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

type CompleteType = null | 'update' | 'delete';

Detail.isAdminPage = true;
