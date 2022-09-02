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
    screenNo: yup.number().positive().integer(),
    totalRow: yup.number().positive().integer(),
    totalColumn: yup.number().positive().integer(),
    aisles: yup.array().of(
      yup.object({
        type: yup.number().positive().integer(),
        no: yup.number().positive().integer(),
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
      screenNo: null,
      totalRow: null,
      totalColumn: null,
      aisles: [
        { type: 1, no: 1 },
        { type: 2, no: 3 },
        { type: 1, no: 100 },
      ],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'aisles' });

  const [aisles, setAisles] = useState<AisleFormValue[]>([]);
  const [unselectableSeats, setUnselectableSeats] = useState<
    UnselectableSeatFormValue[]
  >([]);

  const [invalidatedAisleInputs, setInvalidatedAisleInputs] = useState<
    InvalidatedAisleInput[]
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
                {...register('screenNo')}
                isInvalid={Boolean(errors.screenNo)}
              />
              <Form.Control.Feedback type="invalid" className="fs-6">
                {errors.screenNo?.message}
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
            <AisleInputs fields={fields} register={register} />
            <div
              className="d-grid"
              onClick={() => append({ type: 1, no: null })}
            >
              <AddButton />
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h5>선택 불가능한 좌석 지정하기</h5>
            <UnselectableSeatInputs
              unselectableSeats={unselectableSeats}
              onChange={handleUnselectableSeatsChange}
              onDelete={handleUnselectableSeatInputDelete}
            />
            <div className="d-grid" onClick={handleUnselectableSeatInputAdd}>
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

  function handleAislesChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) {
    const name = event.currentTarget.name as keyof AisleFormValue;
    const value = event.currentTarget.value;

    setAisles((aisle) => {
      const aisleCopy = [...aisle];
      aisleCopy[index][name] = value;
      return aisleCopy;
    });
  }
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

  function handleAisleInputAdd() {
    setAisles([...aisles, { no: '', aisle_type_id: '1' }]);
    setInvalidatedAisleInputs([...invalidatedAisleInputs, { no: false }]);
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

  function handleAisleInputDelete(index: number) {
    const aislesCopy = [...aisles];
    aislesCopy.splice(index, 1);
    setAisles(aislesCopy);

    const invalidatedAisleInputsCopy = [...invalidatedAisleInputs];
    invalidatedAisleInputsCopy.splice(index, 1);
    setInvalidatedAisleInputs(invalidatedAisleInputsCopy);
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

interface ScreenFormValues {
  no: string;
  total_row: string;
  total_column: string;
}

export type AisleFormValue = {
  no: string;
  aisle_type_id: string;
};

export type UnselectableSeatFormValue = {
  row: string;
  column: string;
  unselectable_seat_type_id: string;
};

export interface InvalidatedAisleInput {
  no: boolean;
}

export interface FormInputs {
  screenNo: number | null;
  totalRow: number | null;
  totalColumn: number | null;
  aisles: { type: number; no: number | null }[];
}

CreateForm.isAdminPage = true;
