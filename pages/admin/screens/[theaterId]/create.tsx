import AddButton from 'components/admin/screen/createForm/addButton';
import AisleInputs from 'components/admin/screen/createForm/aisleInputs';
import DeleteButton from 'components/admin/screen/createForm/deleteButton';
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
  const [aisles, setAisles] = useState<AisleFormValues>([]);
  const [unselectableSeats, setUnselectableSeats] =
    useState<UnselectableSeatFormValues>([]);

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
            <FloatingLabel controlId="no" label="번호">
              <Form.Control
                name="no"
                type="number"
                value={screen.no}
                onChange={handleChange}
                min="1"
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="total_row" label="행 개수">
              <Form.Control
                name="total_row"
                type="number"
                value={screen.total_row}
                onChange={handleChange}
                min="1"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="total_column" label="열 개수">
              <Form.Control
                name="total_column"
                type="number"
                value={screen.total_column}
                onChange={handleChange}
                min="1"
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h5>통로</h5>
            <AisleInputs aisles={aisles} onChange={handleAislesChange} />
            <div className="d-grid" onClick={handleAisleInputAdd}>
              <AddButton />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h5>선택 불가능한 좌석</h5>
            <UnselectableSeatInputs
              unselectableSeats={unselectableSeats}
              onChange={handleUnselectableSeatsChange}
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
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    switch (name) {
      case 'no':
        setAisles((aisle) => {
          const aisleCopy = [...aisle];
          aisleCopy[index].no = value;
          return aisleCopy;
        });
        break;

      case 'aisle_type_id':
        setAisles((aisle) => {
          const aisleCopy = [...aisle];
          aisleCopy[index].aisle_type_id = value;
          return aisleCopy;
        });
        break;
    }
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
}

interface ScreenFormValues {
  no: string;
  total_row: string;
  total_column: string;
}

export type AisleFormValues = {
  no: string;
  aisle_type_id: string;
}[];

export type UnselectableSeatFormValues = UnselectableSeatFormValue[];

type UnselectableSeatFormValue = {
  row: string;
  column: string;
  unselectable_seat_type_id: string;
};

CreateForm.isAdminPage = true;
