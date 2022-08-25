import Modal from 'react-bootstrap/Modal';

export default function MapModal(props: Props) {
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>지도</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 d-flex">
        <iframe
          width="800"
          height="450"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC61vjGwfXwd_d9BTESJEBJKfY4ozMbvsM&q=place_id:${props.googleMapsPlaceId}`}
          allowFullScreen
        />
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  show: boolean;
  googleMapsPlaceId: string | null;
  onHide: () => void;
}
