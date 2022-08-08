import Modal from 'react-bootstrap/Modal';

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
      <Modal.Body>콘텐츠</Modal.Body>
    </Modal>
  );
}

interface Props {
  onHide: () => void;
  type: null | string;
}
