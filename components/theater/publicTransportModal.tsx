import Markdown from 'marked-react';
import Modal from 'react-bootstrap/Modal';

export default function PublicTransportModal(props: Props) {
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>대중교통 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.subway ? (
          <>
            <div className="mb-2">
              <span className="material-symbols-outlined">
                directions_subway
              </span>
              <h5 className="d-inline ms-1">지하철로 오시는 길</h5>
            </div>
            <Markdown>{props.subway}</Markdown>
          </>
        ) : null}
        {props.bus ? (
          <>
            <div className="mb-2">
              <span className="material-symbols-outlined">directions_bus</span>
              <h5 className="d-inline ms-1">버스로 오시는 길</h5>
            </div>
            <Markdown>{props.bus}</Markdown>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  show: boolean;
  subway: string | null;
  bus: string | null;
  onHide: () => void;
}
