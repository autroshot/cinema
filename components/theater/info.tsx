import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CarModal from './carModal';
import MapModal from './mapModal';
import PublicTransportModal from './publicTransportModal';

export default function Info(props: Props) {
  const [showPublicTransportModal, setShowPublicTransportModal] =
    useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

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
        {props.subway || props.bus ? (
          <Col>
            <span
              role="button"
              onClick={() => setShowPublicTransportModal(true)}
            >
              <span className="material-symbols-outlined">
                directions_subway
              </span>{' '}
              대중교통 안내
            </span>
          </Col>
        ) : null}
        {props.car || props.parking ? (
          <Col>
            <span role="button" onClick={() => setShowCarModal(true)}>
              <span className="material-symbols-outlined">directions_car</span>{' '}
              자가용/주차 안내
            </span>
          </Col>
        ) : null}
        {props.googleMapsPlaceId ? (
          <Col>
            <span role="button" onClick={() => setShowMapModal(true)}>
              <span className="material-symbols-outlined">location_on</span>{' '}
              지도 보기
            </span>
          </Col>
        ) : null}
      </Row>
      {props.subway || props.bus ? (
        <PublicTransportModal
          show={showPublicTransportModal}
          subway={props.subway}
          bus={props.bus}
          onHide={() => setShowPublicTransportModal(false)}
        />
      ) : null}
      {props.car || props.parking ? (
        <CarModal
          show={showCarModal}
          car={props.car}
          parking={props.parking}
          onHide={() => setShowCarModal(false)}
        />
      ) : null}
      {props.googleMapsPlaceId ? (
        <MapModal
          show={showMapModal}
          googleMapsPlaceId={props.googleMapsPlaceId}
          onHide={() => setShowMapModal(false)}
        />
      ) : null}
    </>
  );
}

interface Props {
  streetAddress: string;
  subway: string | null;
  bus: string | null;
  car: string | null;
  parking: string | null;
  googleMapsPlaceId: string | null;
}
