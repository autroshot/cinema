import AddButton from 'components/admin/screen/createForm/addButton';
import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import UnselectableSeatInputs from 'components/admin/screen/createForm/unselectableSeatInputs';
import MyAlert from 'components/admin/theater/myAlert';
import { useRouter } from 'next/router';
import { PostRequestData } from 'pages/api/screens';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function CreateForm() {
  yup.setLocale({
    mixed: {
      notType: function notType(_ref) {
        switch (_ref.type) {
          case 'number':
            return '필숫값입니다.';
          default:
            return 'Wrong type error';
        }
      },
      required: '필숫값입니다.',
    },
    number: {
      positive: '양수만 가능합니다.',
      integer: '정수만 가능합니다.',
    },
  });
  const schema = yup.object({
    no: yup.number().positive().integer(),
    totalRow: yup.number().positive().integer(),
    totalColumn: yup.number().positive().integer(),
    aisles: yup.array().of(
      yup.object({
        no: yup.number().positive().integer(),
      })
    ),
    unselectableSeats: yup.array().of(
      yup.object({
        row: yup.number().positive().integer(),
        column: yup.number().positive().integer(),
      })
    ),
  });

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    defaultValues: {
      no: null,
      totalRow: null,
      totalColumn: null,
      aisles: [
        { typeId: 1, no: 1 },
        { typeId: 2, no: 3 },
        { typeId: 1, no: 100 },
      ],
      unselectableSeats: [
        { typeId: 1, row: 1, column: 5 },
        { typeId: 2, row: 3, column: 6 },
        { typeId: 2, row: 100, column: 7 },
      ],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    fields: aisleFields,
    append: aisleAppend,
    remove: aisleRemove,
  } = useFieldArray({ control, name: 'aisles' });
  const {
    fields: unselectableSeatFields,
    append: unselectableSeatAppend,
    remove: unselectableSeatRemove,
  } = useFieldArray({ control, name: 'unselectableSeats' });

  const [unselectableSeats, setUnselectableSeats] = useState<
    UnselectableSeatFormValue[]
  >([]);

  const [alert, setAlert] = useState<null | string>(null);

  const router = useRouter();
  const { theaterId } = router.query;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container className="my-3">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h3 data-cy="title" className="mb-3">
          상영관 등록
        </h3>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="screenNo" label="상영관 번호">
              <Form.Control
                type="number"
                min="1"
                placeholder="1"
                {...register('no')}
                isInvalid={Boolean(errors.no)}
              />
              <Form.Control.Feedback type="invalid" className="fs-6">
                {errors.no?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="totalRow" label="좌석 행 개수">
              <Form.Control
                type="number"
                min="1"
                placeholder="1"
                {...register('totalRow')}
                isInvalid={Boolean(errors.totalRow)}
              />
              <Form.Control.Feedback type="invalid" className="fs-6">
                {errors.totalRow?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="totalColumn" label="좌석 열 개수">
              <Form.Control
                type="number"
                min="1"
                placeholder="1"
                {...register('totalColumn')}
                isInvalid={Boolean(errors.totalColumn)}
              />
              <Form.Control.Feedback type="invalid" className="fs-6">
                {errors.totalColumn?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h5>통로 만들기</h5>
            <AisleInputs control={control} register={register} />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h5>선택 불가능한 좌석 지정하기</h5>
            <UnselectableSeatInputs
              fields={unselectableSeatFields}
              errors={errors}
              register={register}
              onRemove={unselectableSeatRemove}
            />
            <div
              className="d-grid"
              onClick={() =>
                unselectableSeatAppend({ typeId: 1, row: null, column: null })
              }
            >
              <AddButton />
            </div>
          </Col>
        </Row>
        {alert ? <MyAlert message={alert} /> : null}
        {isValid ? (
          <>
            <div className="mb-3">좌석 배치도</div>
            <div>{JSON.stringify(watch())}</div>
            <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
            <Button className="me-3">등록</Button>
            <Button>취소</Button>
          </>
        ) : (
          <div>모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.</div>
        )}
      </Form>
    </Container>
  );

  function handleUnselectableSeatsChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) {
    const name = event.currentTarget.name as keyof UnselectableSeatFormValue;
    const value = event.currentTarget.value;

    setUnselectableSeats((unselectableSeats) => {
      const unselectableSeatsCopy = [...unselectableSeats];
      unselectableSeatsCopy[index][name] = value;
      return unselectableSeatsCopy;
    });
  }

  function handleUnselectableSeatInputAdd() {
    setUnselectableSeats([
      ...unselectableSeats,
      {
        row: '',
        column: '',
        unselectable_seat_type_id: '1',
      },
    ]);
  }
  function handleUnselectableSeatInputDelete(index: number) {
    const unselectableSeatsCopy = [...unselectableSeats];
    unselectableSeatsCopy.splice(index, 1);
    setUnselectableSeats(unselectableSeatsCopy);
  }

  function handleSeatingMapMake() {
    // TODO:
  }
}

export type UnselectableSeatFormValue = {
  row: string;
  column: string;
  unselectable_seat_type_id: string;
};

export interface FormInputs {
  no: number | null;
  totalRow: number | null;
  totalColumn: number | null;
  aisles: { typeId: number; no: number | null }[];
  unselectableSeats: {
    typeId: number;
    row: number | null;
    column: number | null;
  }[];
}

CreateForm.isAdminPage = true;
