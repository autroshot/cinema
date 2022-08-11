import Markdown from 'marked-react';
import Modal from 'react-bootstrap/Modal';
import { modalType } from './info';

export default function TheaterModal(props: Props) {
  const SUBWAY_DUMMY =
    '- [8호선 잠실역]\n- 8호선 개찰구 통과 후 지하 1층 대합실 이동(10번, 11번 출구 방면) > 우측 10M 앞 쇼핑몰 게이트 통과(10번 11번 출구 사이 통로) > 아쿠아리움 출구 옆 엘리베이터 이용\n- [2호선 잠실역]\n- <롯데몰 영업시간 내> 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n- <롯데몰 영업시간 외> 1층 지상으로 이동(1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용';
  const BUS_DUMMY =
    '- [지선버스]\n - 잠실역1번,11번출구 정류장 하차(정류장번호 24134) > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 이용 > 투명 엘리베이터 또는 에잇세컨즈/유니클로 사이 엘리베이터 이용\n - [광역버스]\n - <롯데몰 영업시간 내> 잠실광역환승센터(지하) 하차(정류장번호 24050) > 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n - <롯데몰 영업시간 외> 1층 지상으로 이동(잠실역 1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용';
  const CAR_DUMMY =
    '- [내비게이션 검색] 롯데시네마월드타워\n- [주소] 서울특별시 송파구 올림픽로 300 롯데월드몰 (서울특별시 송파구 신천동 29번지 롯데월드몰)\n- [주차장 이용방법]\n- 롯데월드 몰/타워 주차장 입구로 이동 (모든 주차장 입구 영화관 주차장 연결 가능)\n- B2 ~ B6층 기둥 알파벳 S ~ W 구역 인근 주차\n- 기둥 알파벳 V/W 양쪽 입구 내부 엘리베이터 이용하여 5~10층 이동';
  const PARKING_DUMMY =
    '- 영화 관람 후 할인 적용 시 10분당 200원(최대 4시간 4,800원)\n- 심야 할인 적용\n- 오후 10시 ~ 오전 6시 10분당 100원 (최대 4시간 2,400원)\n- 모바일/앱 예매 시 우측 상단 ‘주차권’ 버튼 클릭\n- 주차 정산은 지하 주차장 층별 주차 정산기 이용\n- 롯데월드몰 주차 요금\n- 운영 시간에 따라 요금 상이 (10분당 300원 ~ 500원)';

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
      <Modal.Body className={props.type !== '지도' ? undefined : 'p-0 d-flex'}>
        {createBody(props.type, CAR_DUMMY, PARKING_DUMMY)}
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  onHide: () => void;
  type: null | modalType;
}

function createBody(
  type: null | modalType,
  content1?: string,
  content2?: string
) {
  switch (type) {
    case null:
      return;
    case '대중교통 안내':
      return (
        <>
          <div className="mb-2">
            <span className="material-symbols-outlined">directions_subway</span>
            <h5 className="d-inline ms-1">지하철로 오시는 길</h5>
          </div>
          <Markdown>{content1}</Markdown>
          <div className="mb-2">
            <span className="material-symbols-outlined">directions_bus</span>
            <h5 className="d-inline ms-1">버스로 오시는 길</h5>
          </div>
          <Markdown>{content2}</Markdown>
        </>
      );
    case '자가용/주차 안내':
      return (
        <>
          <div className="mb-2">
            <span className="material-symbols-outlined">directions_car</span>
            <h5 className="d-inline ms-1">자가용으로 오시는 길</h5>
          </div>
          <Markdown>{content1}</Markdown>
          <div className="mb-2">
            <span className="material-symbols-outlined">local_parking</span>
            <h5 className="d-inline ms-1">주차 안내</h5>
          </div>
          <Markdown>{content2}</Markdown>
        </>
      );
    case '지도':
      return (
        <iframe
          width="800"
          height="450"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC61vjGwfXwd_d9BTESJEBJKfY4ozMbvsM&q=place_id:ChIJe-TQ0zOlfDURLRV7utwMM3w"
          allowFullScreen
        />
      );
  }
}
