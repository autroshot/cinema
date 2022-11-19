import { Prisma } from '@prisma/client';

const aisleTypes: Prisma.aisle_typeCreateInput[] = [
  { id: 1, name: 'row' },
  { id: 2, name: 'column' },
];

const unselectableSeatTypes: Prisma.unselectable_seat_typeCreateInput[] = [
  { id: 1, name: 'nonexistent' },
  { id: 2, name: 'unavailable' },
];

const theaters: Prisma.theaterCreateInput[] = [
  {
    name: '월드타워',
    street_address: '서울 송파구 올림픽로 300 (신천동) 5층-11층',
    google_maps_place_id: 'ChIJe-TQ0zOlfDURLRV7utwMM3w',
    subway:
      '- [8호선 잠실역]\n- 8호선 개찰구 통과 후 지하 1층 대합실 이동(10번, 11번 출구 방면) > 우측 10M 앞 쇼핑몰 게이트 통과(10번 11번 출구 사이 통로) > 아쿠아리움 출구 옆 엘리베이터 이용\n- [2호선 잠실역]\n- <롯데몰 영업시간 내> 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n- <롯데몰 영업시간 외> 1층 지상으로 이동(1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용',
    bus: '- [지선버스]\n - 잠실역1번,11번출구 정류장 하차(정류장번호 24134) > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 이용 > 투명 엘리베이터 또는 에잇세컨즈/유니클로 사이 엘리베이터 이용\n - [광역버스]\n - <롯데몰 영업시간 내> 잠실광역환승센터(지하) 하차(정류장번호 24050) > 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n - <롯데몰 영업시간 외> 1층 지상으로 이동(잠실역 1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용',
    car: '- [내비게이션 검색] 롯데시네마월드타워\n- [주소] 서울특별시 송파구 올림픽로 300 롯데월드몰 (서울특별시 송파구 신천동 29번지 롯데월드몰)\n- [주차장 이용방법]\n- 롯데월드 몰/타워 주차장 입구로 이동 (모든 주차장 입구 영화관 주차장 연결 가능)\n- B2 ~ B6층 기둥 알파벳 S ~ W 구역 인근 주차\n- 기둥 알파벳 V/W 양쪽 입구 내부 엘리베이터 이용하여 5~10층 이동',
    parking:
      '- 영화 관람 후 할인 적용 시 10분당 200원(최대 4시간 4,800원)\n- 심야 할인 적용\n- 오후 10시 ~ 오전 6시 10분당 100원 (최대 4시간 2,400원)\n- 모바일/앱 예매 시 우측 상단 ‘주차권’ 버튼 클릭\n- 주차 정산은 지하 주차장 층별 주차 정산기 이용\n- 롯데월드몰 주차 요금\n- 운영 시간에 따라 요금 상이 (10분당 300원 ~ 500원)',
  },
  {
    name: '수원',
    street_address: '경기 수원시 권선구 세화로 134 5층',
    google_maps_place_id: 'ChIJl9JmWR1DezURL7_FtHaIlR4',
    subway:
      '- [쇼핑몰 영업 시간 내]\n- 1호선, 수인분당선 수원역 → 역사 2층 또는 지하 1층 수원역 환승센터를 통해 롯데몰 수원 진입 → 센터홀 유니클로 매장 뒤쪽 엘리베이터 이용 5층 시네마 도착\n- [쇼핑몰 영업 시간 외]\n- 1호선, 수인분당선 수원역 → 역사 2층 또는 지하 1층 수원역 환승센터를 통해 지상 1층으로 이동 후 롯데몰 1층 9번 게이트에서 엘리베이터를 이용 5층 시네마 도착',
    bus: '- [쇼핑몰 영업 시간 내]\n- 수원역 / 수원역 환승센터 하차 → 수원역 환승센터 2층 통해 롯데몰 수원 진입 → 유니클로 매장 뒤쪽 엘리베이터 이용 5층 시네마 도착\n- [쇼핑몰 영업 시간 외]\n- 수원역 / 수원역 환승센터 하차 → 수원역 환승센터에서 에스컬레이터로 지상 1층 이동 → 롯데몰 1층 9번 게이트에서 엘리베이터를 이용 5층 시네마 도착',
    car: '- [네비게이션 검색]\n- 롯데시네마 수원 (경기도 수원시 권선구 세화로 134 롯데몰 수원 5층)\n- [주차장 이용 방법]\n- 지하층 주차 > 주차 기둥 알파벳 K-Q 구역 인근 주차 후 L5 구역 엘리베이터 이용하여 5층 이동 / 지상층 주차 > 주차 기둥 알파벳 K-Q 구역 인근 주차 후 L3 구역 입구 이용하여 에스컬레이터 5층 이동',
    parking:
      '- [주차 시간 안내]\n- 영화 관람 당일 3시간 30분 무료주차: 초과 시 10분당 500원 부과 / 백화점, 몰, 마트 구매 금액 합산 시 최대 7시간 무료주차\n- [주차권 안내]\n- 지류티켓: 영화 티켓 하단 거래번호 바코드 사용\n- 모바일티켓: 바로티켓 상단 주차권 버튼 터치하여 바코드 사용\n- [주차 정산 안내]\n- 주차 정산: 출차 전 각 층 무인 사전정산기를 이용하여 정산 진행\n- 차량이 2대 이상인 경우 주차권 추가 지급: 영화관 직원에게 요청\n- 무료 주차장 기준: 롯데몰 수원 지하2층 ~ 지상 4.5층 적용 (건물 외부 주차장은 무료주차 불가)',
  },
  {
    name: '건대입구',
    street_address: '서울 광진구 아차산로 262',
    google_maps_place_id: 'ChIJqVKnNOakfDURdM5EH2iL7yk',
    subway:
      '- 2호선 건대입구역 하차\n- 건대입구역 5번 출구 방향 이동 > 정면 횡단보도 이용 후 200m 직진 > 첫번째 횡단보도 지난 후 우측 스타시티 쇼핑몰(이마트) GATE 1 진입 > 좌측으로 5m 이동 후 엘리베이터 이용(2층) > 우측 홀 이동\n\n- 7호선 건대입구역 하차\n- 건대입구역 4번 출구 방향 좌측 롯데백화점 연결 통로(B1층) 이용하여 스타시티 쇼핑몰 진입 >정면 에스컬레이터 이용 2층 이동>우측 Emoi 쌀국수 앞 구름다리 이용 롯데시네마 진입',
    bus: null,
    car: null,
    parking:
      '- 영화 관람 당일 2시간 30분 무료 (기본 30분 무료 포함)\n초과 시 10분당 700원 / 쇼핑몰 구매금액 합산 가능 (최대 5시간 무료)\n\n- [주차권 안내]\n(1)모바일티켓 _ 바로티켓 우측 상단 주차권 버튼 클릭시 바코드 생성\n(2)지류티켓 _ 영화티켓 하단 주차권 바코드 사용\n주차권 미출력시 스위트샵 방문\n\n- [주차 정산]\n(1)출차시 출구쪽 유인 정산소 주차권 제시\n(2)출차시 무인정산기 사전 정산(정산 후 20분내 미출차시 추가 요금 발생)\n차량번호 입력 후 주차권 바코드 스캔\n\n- [무인 정산기 위치]\n지하 2,3층 엘리베이터 앞',
  },
  {
    name: '노원',
    street_address: '서울 노원구 동일로 1414 (상계동) 롯데백화점',
    google_maps_place_id: null,
    subway: null,
    bus: null,
    car: `- <네비게이션 검색>\n'롯데시네마 노원' 서울특별시 노원구 동일로 1414 (롯데백화점 노원점 10층)\n\n- <백화점 영업 중 주차장 이용 방법>\n(1)본관(지하주차장 B2F~B3F), 별관(B2F~5F)\n(2)주차가능대수 총 958대\n(3)영화관 인접구역\n   본관-B2F 205구역, B3F 305구역 / 별관-3F 302구역\n(4)영화관 오시는 길\n   본관-인접구역 엘리베이터 이용 / 별관- 3F 연결통로(301, 302구역 사이) 이동 > 엘리베이터, 에스컬레이터 이용\n\n- <백화점 휴점 / 폐점 시 주차장 이용 방법>\n(1)별관 B2F~5F (본관 미개방)\n(2)영화관 인접구역-각 층 02 구역\n(3)영화관 오시는 길\n   별관 1F 입구 정면 횡단보도 도보이동(약3분) > 백화점 본관 정문(노원역사거리방면) 가장 좌측 '시네마전용입구' 이용`,
    parking: null,
  },
];

const screens: Prisma.screenCreateInput[] = [
  {
    no: 1,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
    aisles: {
      createMany: {
        data: [
          {
            no: 2,
            aisle_type_id: 1,
          },
          {
            no: 3,
            aisle_type_id: 1,
          },
          {
            no: 7,
            aisle_type_id: 1,
          },
          {
            no: 10,
            aisle_type_id: 1,
          },
          {
            no: 40,
            aisle_type_id: 2,
          },
          {
            no: 43,
            aisle_type_id: 2,
          },
        ],
        skipDuplicates: true,
      },
    },
    unselectable_seats: {
      createMany: {
        data: [
          {
            row: 1,
            column: 1,
            unselectable_seat_type_id: 2,
          },
          {
            row: 1,
            column: 2,
            unselectable_seat_type_id: 2,
          },
          {
            row: 5,
            column: 5,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 6,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 7,
            unselectable_seat_type_id: 1,
          },
        ],
        skipDuplicates: true,
      },
    },
  },
  {
    no: 2,
    total_row: 11,
    total_column: 16,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 3,
    total_row: 11,
    total_column: 20,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 4,
    total_row: 14,
    total_column: 26,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 5,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 6,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 7,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 8,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 9,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 10,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 11,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 12,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 13,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 14,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 15,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 1 },
    },
  },
  {
    no: 1,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 2 },
    },
    aisles: {
      createMany: {
        data: [
          {
            no: 2,
            aisle_type_id: 1,
          },
          {
            no: 3,
            aisle_type_id: 1,
          },
          {
            no: 4,
            aisle_type_id: 1,
          },
          {
            no: 2,
            aisle_type_id: 1,
          },
          {
            no: 3,
            aisle_type_id: 2,
          },
          {
            no: 4,
            aisle_type_id: 2,
          },
        ],
        skipDuplicates: true,
      },
    },
    unselectable_seats: {
      createMany: {
        data: [
          {
            row: 1,
            column: 1,
            unselectable_seat_type_id: 2,
          },
          {
            row: 1,
            column: 2,
            unselectable_seat_type_id: 2,
          },
          {
            row: 5,
            column: 5,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 6,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 7,
            unselectable_seat_type_id: 1,
          },
        ],
        skipDuplicates: true,
      },
    },
  },
  {
    no: 2,
    total_row: 11,
    total_column: 16,
    theater: {
      connect: { id: 2 },
    },
    aisles: {
      createMany: {
        data: [
          {
            no: 2,
            aisle_type_id: 1,
          },
          {
            no: 3,
            aisle_type_id: 1,
          },
          {
            no: 4,
            aisle_type_id: 1,
          },
          {
            no: 2,
            aisle_type_id: 1,
          },
          {
            no: 3,
            aisle_type_id: 2,
          },
          {
            no: 4,
            aisle_type_id: 2,
          },
        ],
        skipDuplicates: true,
      },
    },
    unselectable_seats: {
      createMany: {
        data: [
          {
            row: 1,
            column: 1,
            unselectable_seat_type_id: 2,
          },
          {
            row: 1,
            column: 2,
            unselectable_seat_type_id: 2,
          },
          {
            row: 5,
            column: 5,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 6,
            unselectable_seat_type_id: 1,
          },
          {
            row: 5,
            column: 7,
            unselectable_seat_type_id: 1,
          },
        ],
        skipDuplicates: true,
      },
    },
  },
  {
    no: 3,
    total_row: 11,
    total_column: 20,
    theater: {
      connect: { id: 2 },
    },
  },
  {
    no: 4,
    total_row: 14,
    total_column: 26,
    theater: {
      connect: { id: 2 },
    },
  },
  {
    no: 5,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 2 },
    },
  },
  {
    no: 1,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 2,
    total_row: 11,
    total_column: 16,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 3,
    total_row: 11,
    total_column: 20,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 4,
    total_row: 14,
    total_column: 26,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 5,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 6,
    total_row: 14,
    total_column: 26,
    theater: {
      connect: { id: 3 },
    },
  },
  {
    no: 7,
    total_row: 13,
    total_column: 46,
    theater: {
      connect: { id: 3 },
    },
  },
];

const testData = { theaters, screens, aisleTypes, unselectableSeatTypes };

export default testData;
