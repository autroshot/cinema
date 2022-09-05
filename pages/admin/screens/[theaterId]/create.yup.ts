import * as yup from 'yup';

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

export const schema = yup.object({
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
                return (value as number) < (this as any).from[1].value.totalRow;
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
            return (value as number) <= (this as any).from[1].value.totalColumn;
          }
        ),
    })
  ),
});
