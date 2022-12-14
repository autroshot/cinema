import Modal from 'react-bootstrap/Modal';

export default function YoutubeModal(props: Props) {
  return (
    <Modal
      size="lg"
      show={props.youtubeId ? true : false}
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>트레일러</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 d-flex">
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube-nocookie.com/embed/${props.youtubeId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  onHide: () => void;
  youtubeId: null | string;
}
