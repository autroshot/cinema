import Modal from 'react-bootstrap/Modal';
import { modalType } from './info';

export default function TheaterModal(props: Props) {
  let content = '';
  switch (props.type) {
    case null:
      break;
    case '대중교통 안내':
      content = '지하철로 오시는 길...';
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
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
}

interface Props {
  onHide: () => void;
  type: null | modalType;
}
