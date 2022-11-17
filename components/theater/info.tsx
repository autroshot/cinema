import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CarModal from './carModal';
import MapModal from './mapModal';
import PublicTransportModal from './publicTransportModal';

export default function Info({
  screenCount,
  seatCount,
  streetAddress,
  subway,
  bus,
  car,
  parking,
  googleMapsPlaceId,
}: Props) {
  const [showPublicTransportModal, setShowPublicTransportModal] =
    useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 g-1">
        <Col>
          <b>&middot;</b> 총 상영관 수{' '}
          <b>
            <span data-cy="screenCount">{screenCount}</span>개관
          </b>
        </Col>
        <Col>
          <b>&middot;</b> 총 좌석 수{' '}
          <b>
            <span data-cy="seatCount">{seatCount.toLocaleString('en-US')}</span>
            석
          </b>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <b>{streetAddress}</b>
        </Col>
      </Row>
      <Row className="mt-4 row-cols-1 row-cols-sm-3 g-1">
        {subway || bus ? (
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
        {car || parking ? (
          <Col>
            <span role="button" onClick={() => setShowCarModal(true)}>
              <span className="material-symbols-outlined">directions_car</span>{' '}
              자가용/주차 안내
            </span>
          </Col>
        ) : null}
        {googleMapsPlaceId ? (
          <Col>
            <span role="button" onClick={() => setShowMapModal(true)}>
              <span className="material-symbols-outlined">location_on</span>{' '}
              지도 보기
            </span>
          </Col>
        ) : null}
      </Row>
      {subway || bus ? (
        <PublicTransportModal
          show={showPublicTransportModal}
          subway={subway}
          bus={bus}
          onHide={() => setShowPublicTransportModal(false)}
        />
      ) : null}
      {car || parking ? (
        <CarModal
          show={showCarModal}
          car={car}
          parking={parking}
          onHide={() => setShowCarModal(false)}
        />
      ) : null}
      {googleMapsPlaceId ? (
        <MapModal
          show={showMapModal}
          googleMapsPlaceId={googleMapsPlaceId}
          onHide={() => setShowMapModal(false)}
        />
      ) : null}
    </>
  );
}

interface Props {
  screenCount: number;
  seatCount: number;
  streetAddress: string;
  subway: string | null;
  bus: string | null;
  car: string | null;
  parking: string | null;
  googleMapsPlaceId: string | null;
}
