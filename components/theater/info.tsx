import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import TheaterModal from './TheaterModal';

export default function Info(props: Props) {
  const [modalType, setModalType] = useState<null | modalType>(null);

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 g-1">
        <Col>
          {/* TODO: 미구현 */}
          <b>&middot;</b> 총 상영관 수 <b>21개관</b>
        </Col>
        <Col>
          {/* TODO: 미구현 */}
          <b>&middot;</b> 총 좌석수 <b>4,609석</b>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <b>{props.streetAddress}</b>
        </Col>
      </Row>
      <Row className="mt-4 row-cols-1 row-cols-sm-3 g-1">
        <Col>
          <span role="button" onClick={() => handleClick('대중교통 안내')}>
            <span className="material-symbols-outlined">directions_subway</span>{' '}
            대중교통 안내
          </span>
        </Col>
        <Col>
          <span role="button" onClick={() => handleClick('자가용/주차 안내')}>
            <span className="material-symbols-outlined">directions_car</span>{' '}
            자가용/주차 안내
          </span>
        </Col>
        <Col>
          <span role="button" onClick={() => handleClick('지도')}>
            <span className="material-symbols-outlined">location_on</span> 지도
            보기
          </span>
        </Col>
      </Row>
      <TheaterModal onHide={handleHide} type={modalType} />
    </>
  );

  function handleClick(newModalType: modalType) {
    setModalType(newModalType);
  }

  function handleHide() {
    setModalType(null);
  }
}

export type modalType = '대중교통 안내' | '자가용/주차 안내' | '지도';

interface Props {
  streetAddress: string;
}
