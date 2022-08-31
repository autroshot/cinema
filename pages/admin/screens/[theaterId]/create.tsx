import AddButton from 'components/admin/screen/createForm/addButton';
import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import UnselectableSeatInputs from 'components/admin/screen/createForm/unselectableSeatInputs';
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
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h5>통로 만들기</h5>
            <AisleInputs
              aisles={aisles}
              onChange={handleAislesChange}
              onDelete={handleAisleInputDelete}
            />
            <div className="d-grid" onClick={handleAisleInputAdd}>
              <AddButton />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
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

        <Button>좌석 배치도 확인</Button>
        <div className="mb-3">좌석 배치도</div>
        <p>{theaterId} 영화관에 새 상영관을 등록합니다.</p>
        <Button>등록</Button>
        <Button>취소</Button>
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
  }
  function handleUnselectableSeatInputDelete(index: number) {
    const unselectableSeatsCopy = [...unselectableSeats];
    unselectableSeatsCopy.splice(index, 1);
    setUnselectableSeats(unselectableSeatsCopy);
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

CreateForm.isAdminPage = true;
