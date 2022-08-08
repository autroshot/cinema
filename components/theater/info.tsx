import { Col, Row } from 'react-bootstrap';

export default function Info() {
  return (
    <>
      <Row>
        <Col>
          <b>&middot;</b> 총 상영관 수 <b>21개관</b>
        </Col>
        <Col>
          <b>&middot;</b> 총 좌석수 <b>4,609석</b>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <b>서울 송파구 올림픽로 300 (신천동) 5층-11층</b>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <span role="button">
            <span className="material-symbols-outlined">directions_subway</span>{' '}
            대중교통 안내
          </span>
        </Col>
        <Col>
          <span role="button">
            <span className="material-symbols-outlined">directions_car</span>{' '}
            자가용/주차안내
          </span>
        </Col>
        <Col>
          <span role="button">
            <span className="material-symbols-outlined">location_on</span>{' '}
            지도보기
          </span>
        </Col>
      </Row>
    </>
  );
}
