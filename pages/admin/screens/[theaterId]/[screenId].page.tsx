import BottomButtons from 'components/admin/screen/detail/bottomButtons';
import NoticeModal from 'components/admin/theater/noticeModal';
import ScreenForm, {
  FormInputs,
  toRequestData,
} from 'components/common/screenForm';
import { useRouter } from 'next/router';
import { Container, Form } from 'react-bootstrap';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'components/common/screenForm.yup';
import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from 'db';
import { unselectable_seat_type } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetResponseData as TheaterGetResponseData } from 'pages/api/theaters/[theaterId]/index.page';
import { ErrorResponseData } from 'pages/api/commonTypes';
import {
  GetResponseData as ScreenGetResponseData,
  PutRequestData,
} from 'pages/api/theaters/[theaterId]/screens/[screenId].page';
import ShowChildrenOrStatus, {
  Status,
} from 'components/common/showChildrenOrStatus';
import ConfirmModal from 'components/admin/theater/detail/confirmModal';

export default function Detail({ unselectableSeatTypes }: Props) {
  const [theaterName, setTheaterName] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [processing, setProcessing] = useState(false);
  const [completeType, setCompleteType] = useState<CompleteType>(null);
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
    useState(false);

  const methods = useForm<FormInputs>({
    defaultValues: {
      no: null,
      totalRow: null,
      totalColumn: null,
      aisles: [],
      unselectableSeats: [],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    getValues,
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setProcessing(true);
    // TODO: 테스트용
    console.log(data);

    axios
      .put(
        `/api/theaters/${router.query.theaterId}/screens/${router.query.screenId}`,
        toRequestData(data) as PutRequestData
      )
      .then((res) => {
        setCompleteType('update');
      })
      .catch((err) => {
        if (err.response) {
          setAlert((err.response.data as ErrorResponseData).message);
          return;
        }
        setAlert('오류');
      })
      .then(() => {
        setProcessing(false);
      });
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      axios
        .get<ScreenGetResponseData>(
          `/api/theaters/${router.query.theaterId}/screens/${router.query.screenId}`
        )
        .then((res) => {
          if (!res.data) {
            setStatus('noData');
          } else {
            const defaultValues: FormInputs = {
              no: router.query.screenId as string,
              ...toFormValues(res.data),
            };
            reset(defaultValues);
            setStatus('showChildren');
          }
        })
        .catch((err) => {
          if (err.response) {
            setAlert((err.response.data as ErrorResponseData).message);
            return;
          }
          setAlert('오류');
        });

      axios
        .get<TheaterGetResponseData>(`/api/theaters/${router.query.theaterId}`)
        .then((res) => {
          setTheaterName(res.data ? res.data.name : null);
        })
        .catch((err) => {
          if (err.response) {
            setAlert((err.response.data as ErrorResponseData).message);
            return;
          }
          setAlert('오류');
        });
    }
  }, [reset, router]);

  return (
    <>
      <Container className="my-3">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h3 data-cy="title" className="mb-3">
            상영관 상세
          </h3>
          <ShowChildrenOrStatus status={status}>
            <>
              <FormProvider {...methods}>
                <ScreenForm
                  unselectableSeatTypes={unselectableSeatTypes}
                  theaterName={theaterName}
                  alert={alert}
                  screenNoReadOnly={true}
                />
              </FormProvider>
              <BottomButtons
                isValid={isValid}
                processing={processing}
                onDeleteButtonClick={() => setShowConfirmDeletionModal(true)}
              />
            </>
          </ShowChildrenOrStatus>
        </Form>
      </Container>
      <NoticeModal
        show={completeType === 'update'}
        bodyText="수정이 완료되었습니다."
        href="/admin/screens"
        linkText="목록으로 돌아가기"
        onClose={() => setCompleteType(null)}
      />
      <NoticeModal
        show={completeType === 'delete'}
        bodyText="삭제가 완료되었습니다."
        href="/admin/screens"
        linkText="목록으로 돌아가기"
      />
      <ConfirmModal
        contentName={`${theaterName} ${getValues('no')}관`}
        show={showConfirmDeletionModal}
        onClose={() => setShowConfirmDeletionModal(false)}
        onDelete={handleDelete}
      />
    </>
  );

  async function handleDelete() {
    console.log('request delete');

    // setProcessing(true);
    // const response = await fetch(`/api/theaters/${id}`, {
    //   method: 'DELETE',
    // });
    // setProcessing(false);

    // if (response.status === 500) {
    //   const responseJson = (await response.json()) as ErrorResponseData;
    //   setAlert(responseJson.message);
    //   return;
    // }
    // if (response.status === 204) {
    //   setShowConfirmModal(false);
    //   setCompleteType('delete');
    //   return;
    // }
    setShowConfirmDeletionModal(false);
    setCompleteType('delete');
  }

  function toFormValues(
    screenGetResponseDataWithoutNull: Exclude<ScreenGetResponseData, null>
  ): Omit<FormInputs, 'no'> {
    return {
      totalRow: screenGetResponseDataWithoutNull.total_row.toString(),
      totalColumn: screenGetResponseDataWithoutNull.total_column.toString(),
      aisles: screenGetResponseDataWithoutNull.aisles.map((aisle) => {
        return {
          typeId: aisle.aisle_type_id.toString(),
          no: aisle.no.toString(),
        };
      }),
      unselectableSeats:
        screenGetResponseDataWithoutNull.unselectable_seats.map(
          (unselectable_seat) => {
            return {
              typeId: unselectable_seat.unselectable_seat_type_id.toString(),
              row: unselectable_seat.row.toString(),
              column: unselectable_seat.column.toString(),
            };
          }
        ),
    };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const theaters = await prisma.theater.findMany({
    select: {
      id: true,
      screens: {
        select: {
          no: true,
        },
      },
    },
  });

  const paths: Path[] = [];
  theaters.forEach((theater) => {
    theater.screens.forEach((screen) => {
      const path: Path = {
        params: {
          theaterId: theater.id.toString(),
          screenId: screen.no.toString(),
        },
      };
      paths.push(path);
    });
  });

  return { paths: paths, fallback: true };
};
interface Path {
  params: { theaterId: string; screenId: string };
}

export const getStaticProps: GetStaticProps = async () => {
  const unselectableSeatTypes = await prisma.unselectable_seat_type.findMany();

  return {
    props: {
      unselectableSeatTypes,
    },
  };
};

type CompleteType = null | 'update' | 'delete';

export type UnselectableSeatTypes = unselectable_seat_type[];
interface Props {
  unselectableSeatTypes: UnselectableSeatTypes;
}

Detail.isAdminPage = true;
