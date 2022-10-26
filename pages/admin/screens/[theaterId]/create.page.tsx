import { useRouter } from 'next/router';
import { PostRequestData } from 'pages/api/screens/index.page';
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BottomButtons from 'components/admin/screen/createForm/bottomButtons';
import { schema } from 'components/common/screenForm.yup';
import { GetResponseData } from 'pages/api/theaters/[theaterId]/index.page';
import axios from 'axios';
import NoticeModal from 'components/admin/theater/noticeModal';
import { ErrorResponseData } from 'pages/api/commonTypes';
import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from 'db';
import { unselectable_seat_type } from '@prisma/client';
import ScreenForm, {
  convertFormInputs,
  FormInputs,
  removeOverlappingAndSortAisles,
  removeOverlappingAndSortUnselectableSeats,
} from 'components/common/screenForm';

export default function CreateForm({ unselectableSeatTypes }: Props) {
  const [theaterName, setTheaterName] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);

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
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // TODO: 테스트용
    console.log(data);

    setLoading(true);
    axios
      .post('/api/screens', toRequestData(data))
      .then(() => {
        setShowModal(true);
        setAlert(null);
      })
      .catch((err) => {
        if (err.response) {
          setAlert((err.response.data as ErrorResponseData).message);
          return;
        }
        setAlert('오류');
      })
      .then(() => setLoading(false));
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      axios
        .get<GetResponseData>(`/api/theaters/${router.query.theaterId}`)
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
            상영관 등록
          </h3>
          <FormProvider {...methods}>
            <ScreenForm
              unselectableSeatTypes={unselectableSeatTypes}
              theaterName={theaterName}
              alert={alert}
            />
          </FormProvider>
          <BottomButtons disabled={!isValid} loading={loading} />
        </Form>
      </Container>
      <NoticeModal
        show={showModal}
        bodyText="등록이 완료되었습니다."
        href="/admin/screens"
        linkText="목록으로 돌아가기"
        onClose={() => setShowModal(false)}
      />
    </>
  );

  function toRequestData(formInputs: FormInputs): PostRequestData {
    const convertedFormInputs = convertFormInputs(formInputs);
    const processedAisles = removeOverlappingAndSortAisles(
      convertedFormInputs.aisles
    );
    const processedUnselectableSeats =
      removeOverlappingAndSortUnselectableSeats(
        convertedFormInputs.unselectableSeats
      );
    const theaterId = Number(router.query.theaterId);

    return {
      no: convertedFormInputs.no,
      total_row: convertedFormInputs.totalRow,
      total_column: convertedFormInputs.totalColumn,
      theater_id: theaterId,
      unselectable_seats: processedUnselectableSeats.map((unselectableSeat) => {
        return {
          unselectable_seat_type_id: unselectableSeat.typeId,
          row: unselectableSeat.row,
          column: unselectableSeat.column,
        };
      }),
      aisles: processedAisles.map((aisle) => {
        return { aisle_type_id: aisle.typeId, no: aisle.no };
      }),
    };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const theaters = await prisma.theater.findMany({
    select: {
      id: true,
    },
  });

  const paths = theaters.map((theater) => {
    return { params: { theaterId: theater.id.toString() } };
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async () => {
  const unselectableSeatTypes = await prisma.unselectable_seat_type.findMany();

  return {
    props: {
      unselectableSeatTypes,
    },
  };
};

export type UnselectableSeatTypes = unselectable_seat_type[];
interface Props {
  unselectableSeatTypes: UnselectableSeatTypes;
}

CreateForm.isAdminPage = true;
