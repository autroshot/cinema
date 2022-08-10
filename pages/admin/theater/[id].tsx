import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import styles from './detail.module.css';

export default function Detail() {
  const SUBWAY_DUMMY =
    '- [8호선 잠실역]\n- 8호선 개찰구 통과 후 지하 1층 대합실 이동(10번, 11번 출구 방면) > 우측 10M 앞 쇼핑몰 게이트 통과(10번 11번 출구 사이 통로) > 아쿠아리움 출구 옆 엘리베이터 이용\n- [2호선 잠실역]\n- <롯데몰 영업시간 내> 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n- <롯데몰 영업시간 외> 1층 지상으로 이동(1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용';
  const BUS_DUMMY =
    '- [지선버스]\n - 잠실역1번,11번출구 정류장 하차(정류장번호 24134) > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 이용 > 투명 엘리베이터 또는 에잇세컨즈/유니클로 사이 엘리베이터 이용\n - [광역버스]\n - <롯데몰 영업시간 내> 잠실광역환승센터(지하) 하차(정류장번호 24050) > 2호선 출구 중앙 잠실광역버스 환승센터 방면(독도 조형물 입구 앞) > 좌측 쇼핑몰 게이트(삼송빵집 옆)통과 후 우측 방면 > 라인캐릭터 샵 / 전망대 입구 사이 300M 직진 > 아쿠아리움 출구 옆 엘리베이터 이용\n - <롯데몰 영업시간 외> 1층 지상으로 이동(잠실역 1번 출구) > 약 300m 직진 > 송파구청(8호선 11,12번 출구) 방면 엔제리너스 옆 쇼핑몰 게이트 통과 > 에잇세컨즈/유니클로 사이 엘리베이터 이용';
  const CAR_DUMMY =
    '- [내비게이션 검색] 롯데시네마월드타워\n- [주소] 서울특별시 송파구 올림픽로 300 롯데월드몰 (서울특별시 송파구 신천동 29번지 롯데월드몰)\n- [주차장 이용방법]\n- 롯데월드 몰/타워 주차장 입구로 이동 (모든 주차장 입구 영화관 주차장 연결 가능)\n- B2 ~ B6층 기둥 알파벳 S ~ W 구역 인근 주차\n- 기둥 알파벳 V/W 양쪽 입구 내부 엘리베이터 이용하여 5~10층 이동';
  const PARKING_DUMMY =
    '- 영화 관람 후 할인 적용 시 10분당 200원(최대 4시간 4,800원)\n- 심야 할인 적용\n- 오후 10시 ~ 오전 6시 10분당 100원 (최대 4시간 2,400원)\n- 모바일/앱 예매 시 우측 상단 ‘주차권’ 버튼 클릭\n- 주차 정산은 지하 주차장 층별 주차 정산기 이용\n- 롯데월드몰 주차 요금\n- 운영 시간에 따라 요금 상이 (10분당 300원 ~ 500원)';

  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('월드타워');

  return (
    <Container className="mt-4">
      <h3>영화관 상세</h3>
      <p>현재 id: {id}</p>
      <Table bordered>
        <colgroup>
          <col className={styles.attrCol} />
        </colgroup>
        <thead>
          <tr>
            <th>속성</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>100</td>
          </tr>
          <tr>
            <td>name</td>
            <td>
              <input type="text" value={name} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>street_address</td>
            <td>서울 송파구 올림픽로 300 (신천동) 5층-11층</td>
          </tr>
          <tr>
            <td>kakao_map_id</td>
            <td>ChIJe-TQ0zOlfDURLRV7utwMM3w</td>
          </tr>
          <tr>
            <td>subway</td>
            <td className="p-0">
              <textarea
                name="subway"
                cols={100}
                rows={10}
                defaultValue={SUBWAY_DUMMY}
              />
            </td>
          </tr>
          <tr>
            <td>bus</td>
            <td>김포공항</td>
          </tr>
          <tr>
            <td>car</td>
            <td>김포공항</td>
          </tr>
          <tr>
            <td>parking</td>
            <td>김포공항</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }
}

Detail.isAdminPage = true;
