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

export default function CreateForm() {
  const [screen, setScreen] = useState<ScreenFormValues>({
    no: '',
    total_row: '',
    total_column: '',
  });
  const [aisles, setAisles] = useState<AisleFormValue[]>([]);
  const [unselectableSeats, setUnselectableSeats] = useState<
    UnselectableSeatFormValue[]
  >([]);

  const [invalidatedScreenInput, setInvalidatedScreenInput] = useState({
    screen_no: false,
    total_row: false,
    total_column: false,
  });
  const [invalidatedAisleInputs, setInvalidatedAisleInputs] = useState<
    InvalidatedAisleInput[]
  >([]);

  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState<null | string>(null);

  const router = useRouter();
  const { theaterId } = router.query;

  return (
    <Container className="my-3">
      <form action="">
        <h3 data-cy="title" className="mb-3">
          상영관 등록
        </h3>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="no" label="상영관 번호">
              <Form.Control
                name="no"
                type="number"
                min="1"
                placeholder="1"
                value={screen.no}
                onChange={handleChange}
                isInvalid={invalidatedScreenInput.screen_no}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="total_row" label="좌석 행 개수">
              <Form.Control
                name="total_row"
                type="number"
                min="1"
                placeholder="1"
                value={screen.total_row}
                onChange={handleChange}
                isInvalid={invalidatedScreenInput.total_row}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="total_column" label="좌석 열 개수">
              <Form.Control
                name="total_column"
                type="number"
                min="1"
                placeholder="1"
                value={screen.total_column}
                onChange={handleChange}
                isInvalid={invalidatedScreenInput.total_column}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h5>통로 만들기</h5>
            <AisleInputs
              aisles={aisles}
              invalidatedAisleInputs={invalidatedAisleInputs}
              onChange={handleAislesChange}
              onDelete={handleAisleInputDelete}
            />
            <div className="d-grid" onClick={handleAisleInputAdd}>
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
        <div className="mb-3">
          <Button onClick={handleSeatingMapMake}>좌석 배치도 확인</Button>
        </div>
        {validated ? (
          <>
            <div className="mb-3">좌석 배치도</div>
            <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
            <Button>등록</Button>
            <Button>취소</Button>
          </>
        ) : null}
      </form>
    </Container>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setScreen((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

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
    validate();
  }

  function validate() {
    const newInvalidatedScreenInput = {
      screen_no: screen.no.length === 0,
      total_row: screen.total_row.length === 0,
      total_column: screen.total_column.length === 0,
    };
    const aislesCopy = [...aisles];
    const newInvalidatedAisleInputs: InvalidatedAisleInput[] = aislesCopy.map(
      (aisle) => {
        return { no: aisle.no.length === 0 };
      }
    );

    if (
      Object.values(newInvalidatedScreenInput).includes(true) ||
      newInvalidatedAisleInputs.some((newInvalidatedAisleInput) =>
        Object.values(newInvalidatedAisleInput).includes(true)
      )
    ) {
      setAlert('빈 칸이 있습니다.');
    } else {
      setAlert(null);
    }
    setInvalidatedScreenInput(newInvalidatedScreenInput);
    setInvalidatedAisleInputs(newInvalidatedAisleInputs);
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

CreateForm.isAdminPage = true;
