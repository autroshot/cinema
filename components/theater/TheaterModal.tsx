import Markdown from 'marked-react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { modalType } from './info';

export default function TheaterModal(props: Props) {
  let content = '';
  switch (props.type) {
    case null:
      break;
    case '대중교통 안내':
      content = `- [8호선 잠실역]\n- 8호선 개찰구 통과 후 지하 1층 대합실 이동(10번, 11번 출구 방면) > 우측 10M 앞 쇼핑몰 게이트 통과(10번 11번 출구 사이 통로) > 아쿠아리움 출구 옆 엘리베이터 이용\n- [2호선 잠실역]\n- <롯데몰 영업시간 내> 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n- <롯데몰 영업시간 외> 1층 지상으로 이동(1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용`;
      break;
    case '자가용/주차 안내':
      content = '자가용으로 오시는 길...';
      break;
    case '지도':
      content = '지도...';
      break;
  }

  return (
    <Modal
      size="lg"
      show={props.type ? true : false}
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-auto">
            <span className="material-symbols-outlined">directions_subway</span>
          </Col>
          <Col>
            <span>
              <h5>지하철로 오시는 길</h5>
              <Markdown>{content}</Markdown>
            </span>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  onHide: () => void;
  type: null | modalType;
}
