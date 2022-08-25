import Markdown from 'marked-react';
import Modal from 'react-bootstrap/Modal';
import { modalType } from './info';

export default function TheaterModal(props: Props) {
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
        {createBody(props.type, props.content1, props.content2)}
      </Modal.Body>
    </Modal>
  );
}

function createBody(
  type: modalType | null,
  content1: string | null,
  content2: string | null
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

interface Props {
  type: null | modalType;
  content1: string | null;
  content2: string | null;
  onHide: () => void;
}
