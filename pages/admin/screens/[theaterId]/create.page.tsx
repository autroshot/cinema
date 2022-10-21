import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import UnselectableSeatInputs from 'components/admin/screen/createForm/unselectableSeatInputs';
import MyAlert from 'components/admin/theater/myAlert';
import { useRouter } from 'next/router';
import { PostRequestData } from 'pages/api/screens/index.page';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BottomButtons from 'components/admin/screen/createForm/bottomButtons';
import { schema } from './create.yup';
import SeatingMap from 'components/admin/screen/seatingMap/seatingMap';
import { GetResponseData } from 'pages/api/theaters/[id].page';
import axios from 'axios';
import NoticeModal from 'components/admin/theater/noticeModal';
import { ErrorResponseData } from 'pages/api/commonTypes';
import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from 'db';
import { unselectable_seat_type } from '@prisma/client';
import NumberInputWithFloatingLabel from 'components/admin/screen/createForm/numberInputWithFloatingLabel';

export default function CreateForm({ unselectableSeatTypes }: Props) {
  const [theaterName, setTheaterName] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);

  const {
    control,
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
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
          <Row className="mb-3">
            <Col>
              <NumberInputWithFloatingLabel<FormInputs>
                controlId="screenNo"
                label="상영관 번호"
                min="1"
                name="no"
                register={register}
                error={errors.no?.message}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <NumberInputWithFloatingLabel<FormInputs>
                controlId="totalRow"
                label="좌석 행 개수"
                min="1"
                name="totalRow"
                register={register}
                error={errors.totalRow?.message}
                onChange={() => trigger(['aisles', 'unselectableSeats'])}
              />
            </Col>
            <Col>
              <NumberInputWithFloatingLabel<FormInputs>
                controlId="totalColumn"
                label="좌석 열 개수"
                min="1"
                name="totalColumn"
                register={register}
                error={errors.totalColumn?.message}
                onChange={() => trigger(['aisles', 'unselectableSeats'])}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h5>통로 만들기</h5>
              <AisleInputs
                control={control}
                register={register}
                trigger={trigger}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <h5>선택 불가능한 좌석 지정하기</h5>
              <UnselectableSeatInputs
                control={control}
                register={register}
                types={unselectableSeatTypes}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {isValid ? (
                <>
                  <h5 className="mb-3">좌석 배치도</h5>
                  <SeatingMap values={toSeatingMapValues(watch())} />
                  <p className="mt-3">
                    {theaterName} 영화관에 해당 상영관을 등록합니다.
                  </p>
                </>
              ) : (
                <p>모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.</p>
              )}
            </Col>
          </Row>
          {alert ? <MyAlert message={alert} /> : null}
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

  function toSeatingMapValues(formInputs: FormInputs) {
    return {
      totalRow: Number(formInputs.totalRow),
      totalColumn: Number(formInputs.totalColumn),
      unselectableSeats: formInputs.unselectableSeats.map(
        (unselectableSeat) => {
          return {
            typeId: Number(unselectableSeat.typeId),
            row: Number(unselectableSeat.row),
            column: Number(unselectableSeat.column),
          };
        }
      ),
      aisles: sortAndRemoveOverlappingAisles({
        kind: 'frontEnd',
        values: formInputs.aisles.map((aisle) => {
          return { typeId: Number(aisle.typeId), no: Number(aisle.no) };
        }),
      }) as FrontEndAisles,
    };
  }

  function toRequestData(formInputs: FormInputs): PostRequestData {
    return {
      no: Number(formInputs.no),
      total_row: Number(formInputs.totalRow),
      total_column: Number(formInputs.totalColumn),
      theater_id: Number(router.query.theaterId),
      unselectable_seats: formInputs.unselectableSeats.map(
        (unselectableSeat) => {
          return {
            unselectable_seat_type_id: Number(unselectableSeat.typeId),
            row: Number(unselectableSeat.row),
            column: Number(unselectableSeat.column),
          };
        }
      ),
      aisles: sortAndRemoveOverlappingAisles({
        kind: 'db',
        values: formInputs.aisles.map((aisle) => {
          return { aisle_type_id: Number(aisle.typeId), no: Number(aisle.no) };
        }),
      }) as DbAisles,
    };
  }

  function toNumber(formInputs: FormInputs): FormInputsToNumber {
    return {
      no: Number(formInputs.no),
      totalRow: Number(formInputs.totalRow),
      totalColumn: Number(formInputs.totalColumn),
      unselectableSeats: formInputs.unselectableSeats.map(
        (unselectableSeat) => {
          return {
            typeId: Number(unselectableSeat.typeId),
            row: Number(unselectableSeat.row),
            column: Number(unselectableSeat.column),
          };
        }
      ),
      aisles: formInputs.aisles.map((aisle) => {
        return { typeId: Number(aisle.typeId), no: Number(aisle.no) };
      }),
    };
  }

  function sortAndRemoveOverlappingAislesNew(
    aisles: FormInputsToNumber['aisles']
  ): FormInputsToNumber['aisles'] {
    const rowAisles = aisles.filter((aisle) => aisle.typeId === 1);
    const columnAisles = aisles.filter((aisle) => aisle.typeId === 2);

    const resultRowAisles = [...new Set(rowAisles.map((aisle) => aisle.no))]
      .sort((a, b) => a - b)
      .map((aisleNumber) => {
        return { typeId: 1, no: aisleNumber };
      });
    const resultColumnAisles = [
      ...new Set(columnAisles.map((aisle) => aisle.no)),
    ]
      .sort((a, b) => a - b)
      .map((aisleNumber) => {
        return { typeId: 2, no: aisleNumber };
      });

    return [...resultRowAisles, ...resultColumnAisles];
  }
}

function sortAndRemoveOverlappingAisles(
  aislesWithKind: FrontEndAislesWithKind | DbAislesWithKind
): FrontEndAisles | DbAisles {
  switch (aislesWithKind.kind) {
    case 'frontEnd':
      return sortAndRemoveOverlappingFrontEndAisles(aislesWithKind.values);

    case 'db':
      return sortAndRemoveOverlappingDBAisles(aislesWithKind.values);

    default:
      const _exhaustiveCheck: never = aislesWithKind;
      return _exhaustiveCheck;
  }
}

function sortAndRemoveOverlappingFrontEndAisles(
  aisles: FrontEndAisles
): FrontEndAisles {
  const rowAisles = aisles.filter((aisle) => aisle.typeId === 1);
  const columnAisles = aisles.filter((aisle) => aisle.typeId === 2);

  const resultRowAisles = [...new Set(rowAisles.map((aisle) => aisle.no))]
    .sort((a, b) => a - b)
    .map((aisleNumber) => {
      return { typeId: 1, no: aisleNumber };
    });
  const resultColumnAisles = [...new Set(columnAisles.map((aisle) => aisle.no))]
    .sort((a, b) => a - b)
    .map((aisleNumber) => {
      return { typeId: 2, no: aisleNumber };
    });

  return [...resultRowAisles, ...resultColumnAisles];
}
function sortAndRemoveOverlappingDBAisles(aisles: DbAisles): DbAisles {
  const rowAisles = aisles.filter((aisle) => aisle.aisle_type_id === 1);
  const columnAisles = aisles.filter((aisle) => aisle.aisle_type_id === 2);

  const resultRowAisles = [...new Set(rowAisles.map((aisle) => aisle.no))]
    .sort((a, b) => a - b)
    .map((aisleNumber) => {
      return { aisle_type_id: 1, no: aisleNumber };
    });
  const resultColumnAisles = [...new Set(columnAisles.map((aisle) => aisle.no))]
    .sort((a, b) => a - b)
    .map((aisleNumber) => {
      return { aisle_type_id: 1, no: aisleNumber };
    });

  return [...resultRowAisles, ...resultColumnAisles];
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

export interface FormInputs {
  no: string | null;
  totalRow: string | null;
  totalColumn: string | null;
  aisles: { typeId: string; no: string | null }[];
  unselectableSeats: {
    typeId: string;
    row: string | null;
    column: string | null;
  }[];
}

interface FormInputsToNumber {
  no: number;
  totalRow: number;
  totalColumn: number;
  aisles: { typeId: number; no: number }[];
  unselectableSeats: {
    typeId: number;
    row: number;
    column: number;
  }[];
}

type FrontEndAisles = { typeId: number; no: number }[];
type FrontEndAislesWithKind = { kind: 'frontEnd'; values: FrontEndAisles };
type DbAisles = { aisle_type_id: number; no: number }[];
type DbAislesWithKind = { kind: 'db'; values: DbAisles };

export type UnselectableSeatTypes = unselectable_seat_type[];
interface Props {
  unselectableSeatTypes: UnselectableSeatTypes;
}

CreateForm.isAdminPage = true;
