import Markdown from 'marked-react';
import Modal from 'react-bootstrap/Modal';

export default function CarModal(props: Props) {
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>자가용/주차 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.car ? (
          <>
            <div className="mb-2">
              <span className="material-symbols-outlined">
                directions_subway
              </span>
              <h5 className="d-inline ms-1">자가용으로 오시는 길</h5>
            </div>
            <Markdown>{props.car}</Markdown>
          </>
        ) : null}
        {props.parking ? (
          <>
            <div className="mb-2">
              <span className="material-symbols-outlined">directions_bus</span>
              <h5 className="d-inline ms-1">주차 안내</h5>
            </div>
            <Markdown>{props.parking}</Markdown>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  show: boolean;
  car: string | null;
  parking: string | null;
  onHide: () => void;
}
