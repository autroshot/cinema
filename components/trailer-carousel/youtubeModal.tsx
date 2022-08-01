import { Modal } from 'react-bootstrap';

export default function YoutubeModal(props: Props) {
  return (
    <Modal
      size="lg"
      show={props.showModal}
      onHide={props.onHide}
      aria-labelledby="trailer"
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="trailer">트레일러</Modal.Title>
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
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  showModal: boolean;
  onHide: () => void;
  youtubeId: string;
}
