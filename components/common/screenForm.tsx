import { unselectable_seat_type } from '@prisma/client';
import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import NumberInputWithFloatingLabel from 'components/admin/screen/createForm/numberInputWithFloatingLabel';
import UnselectableSeatInputs from 'components/admin/screen/createForm/unselectableSeatInputs';
import SeatingMap from 'components/admin/screen/seatingMap/seatingMap';
import MyAlert from 'components/admin/theater/myAlert';
import { PostRequestData } from 'pages/api/theaters/[theaterId]/screens/index.page';
import { Row, Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

export default function ScreenForm({
  unselectableSeatTypes,
  theaterName,
  alert,
}: Props) {
  const {
    control,
    register,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useFormContext<FormInputs>();

  return (
    <>
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
    </>
  );

  function toSeatingMapValues(formInputs: FormInputs) {
    const result = convertFormInputs(formInputs);
    result.aisles = removeOverlappingAndSortAisles(result.aisles);
    result.unselectableSeats = removeOverlappingAndSortUnselectableSeats(
      result.unselectableSeats
    );

    return result;
  }
}

export function toRequestData(
  formInputs: FormInputs
): Omit<PostRequestData, 'theater_id'> {
  const convertedFormInputs = convertFormInputs(formInputs);
  const processedAisles = removeOverlappingAndSortAisles(
    convertedFormInputs.aisles
  );
  const processedUnselectableSeats = removeOverlappingAndSortUnselectableSeats(
    convertedFormInputs.unselectableSeats
  );

  return {
    no: convertedFormInputs.no,
    total_row: convertedFormInputs.totalRow,
    total_column: convertedFormInputs.totalColumn,
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

function convertFormInputs(formInputs: FormInputs): ConvertedFormInputs {
  return {
    no: Number(formInputs.no),
    totalRow: Number(formInputs.totalRow),
    totalColumn: Number(formInputs.totalColumn),
    unselectableSeats: formInputs.unselectableSeats.map((unselectableSeat) => {
      return {
        typeId: Number(unselectableSeat.typeId),
        row: Number(unselectableSeat.row),
        column: Number(unselectableSeat.column),
      };
    }),
    aisles: formInputs.aisles.map((aisle) => {
      return { typeId: Number(aisle.typeId), no: Number(aisle.no) };
    }),
  };
}

function removeOverlappingAndSortAisles(aisles: aisles): aisles {
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

function removeOverlappingAndSortUnselectableSeats(
  unselectableSeats: unselectableSeats
): unselectableSeats {
  return sortUnselectableSeats(
    removeOverlappingUnselectableSeats(unselectableSeats)
  );
}

function removeOverlappingUnselectableSeats(
  unselectableSeats: unselectableSeats
): unselectableSeats {
  const result: unselectableSeats = [];

  unselectableSeats.forEach((unselectableSeat) => {
    const foundIndex = result.findIndex((element) => {
      return (
        element.row === unselectableSeat.row &&
        element.column === unselectableSeat.column
      );
    });

    if (foundIndex === -1) return result.push(unselectableSeat);
    if (unselectableSeat.typeId < unselectableSeats[foundIndex].typeId)
      return (unselectableSeats[foundIndex].typeId = unselectableSeat.typeId);
  });

  return result;
}

function sortUnselectableSeats(
  unselectableSeats: unselectableSeats
): unselectableSeats {
  return unselectableSeats.sort((seatA, seatB) => {
    if (seatA.row > seatB.row) return 1;
    if (seatA.row < seatB.row) return -1;
    if (seatA.column > seatB.column) return 1;
    if (seatA.column < seatB.column) return -1;
    return 0;
  });
}

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

interface ConvertedFormInputs {
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
type unselectableSeats = ConvertedFormInputs['unselectableSeats'];
type aisles = ConvertedFormInputs['aisles'];

export type UnselectableSeatTypes = unselectable_seat_type[];
interface Props {
  unselectableSeatTypes: UnselectableSeatTypes;
  theaterName: null | string;
  alert: null | string;
}
