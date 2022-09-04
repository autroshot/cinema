import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import UnselectableSeatInputs from 'components/admin/screen/createForm/unselectableSeatInputs';
import MyAlert from 'components/admin/theater/myAlert';
import { useRouter } from 'next/router';
import { PostRequestData } from 'pages/api/screens';
import { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BottomButtons from 'components/admin/screen/createForm/bottomButtons';

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
        typeId: yup.number(),
        no: yup
          .number()
          .moreThan(1, '1보다 커야 합니다.')
          .integer()
          .when('typeId', {
            is: 1,
            then: (schema) =>
              schema.test(
                'less-than-total-row',
                '좌석 행 개수 미만이어야 합니다.',
                function (value) {
                  // yup 타입이 업데이트되지 않아 this를 any로 단언한다.
                  return (
                    (value as number) < (this as any).from[1].value.totalRow
                  );
                }
              ),
            otherwise: (schema) =>
              schema.test(
                'less-than-total-row',
                '좌석 열 개수 미만이어야 합니다.',
                function (value) {
                  // yup 타입이 업데이트되지 않아 this를 any로 단언한다.
                  return (
                    (value as number) < (this as any).from[1].value.totalColumn
                  );
                }
              ),
          }),
      })
    ),
    unselectableSeats: yup.array().of(
      yup.object({
        row: yup
          .number()
          .positive()
          .integer()
          .test(
            'less-than-or-equal-to-total-row',
            '좌석 행 개수 이하여야 합니다.',
            function (value) {
              // yup 타입이 업데이트되지 않아 this를 any로 단언한다.
              return (value as number) <= (this as any).from[1].value.totalRow;
            }
          ),
        column: yup
          .number()
          .positive()
          .integer()
          .test(
            'less-than-or-equal-to-total-column',
            '좌석 열 개수 이하여야 합니다.',
            function (value) {
              // yup 타입이 업데이트되지 않아 this를 any로 단언한다.
              return (
                (value as number) <= (this as any).from[1].value.totalColumn
              );
            }
          ),
      })
    ),
  });

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
      aisles: [
        { typeId: 1, no: 2 },
        { typeId: 2, no: 30 },
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
            <FloatingLabel
              controlId="totalRow"
              label="좌석 행 개수"
              onChange={() => trigger(['aisles', 'unselectableSeats'])}
            >
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
            <FloatingLabel
              controlId="totalColumn"
              label="좌석 열 개수"
              onChange={() => trigger(['aisles', 'unselectableSeats'])}
            >
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
            <UnselectableSeatInputs control={control} register={register} />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            {isValid ? (
              <>
                <div className="mb-3">좌석 배치도</div>
                <div>{JSON.stringify(watch())}</div>
                <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
              </>
            ) : (
              <div>
                모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.
              </div>
            )}
          </Col>
        </Row>
        {alert ? <MyAlert message={alert} /> : null}
        <BottomButtons disabled={!isValid} loading={false} />
      </Form>
    </Container>
  );
}

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
