import BottomButtons from 'components/admin/screen/detail/bottomButtons';
import NoticeModal from 'components/admin/theater/noticeModal';
import ScreenForm, { FormInputs } from 'components/common/screenForm';
import { useRouter } from 'next/router';
import { Container, Form } from 'react-bootstrap';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../components/common/screenForm.yup';
import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from 'db';
import { unselectable_seat_type } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetResponseData as TheaterGetResponseData } from 'pages/api/theaters/[id].page';
import { ErrorResponseData } from 'pages/api/commonTypes';
import { GetResponseData as ScreenGetResponseData } from 'pages/api/theaters/[theaterId]/screens/[screenId].page';
import ShowChildrenOrStatus, {
  Status,
} from 'components/common/showChildrenOrStatus';

export default function Detail({ unselectableSeatTypes }: Props) {
  const [theaterName, setTheaterName] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [processing, setProcessing] = useState(false);
  const [completeType, setCompleteType] = useState<CompleteType>(null);
  const [defaultValues, setDefaultValues] = useState<FormInputs>({
    no: null,
    totalRow: null,
    totalColumn: null,
    aisles: [],
    unselectableSeats: [],
  });

  const methods = useForm<FormInputs>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setProcessing(true);
    // TODO: 테스트용
    console.log(data);

    setTimeout(() => {
      setCompleteType('update');
      setProcessing(false);
    }, 2000);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      // axios
      //   .get<ScreenGetResponseData>(
      //     `/api/theaters/${router.query.theaterId}/screens/${router.query.screenId}`
      //   )
      //   .then((res) => {
      //     if (!res.data) {
      //       setStatus('noData');
      //     } else {
      //       setDefaultValues({res.data});
      //     }
      //   })
      //   .catch((err) => {
      //     if (err.response) {
      //       setAlert((err.response.data as ErrorResponseData).message);
      //       return;
      //     }
      //     setAlert('오류');
      //   });

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
  }, [router]);

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
                />
              </FormProvider>
              <BottomButtons
                isValid={isValid}
                processing={processing}
                onDeleteButtonClick={() => console.log('delete')}
              />
            </>
          </ShowChildrenOrStatus>
        </Form>
      </Container>
    </>
  );
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
