import { Button, Modal } from 'react-bootstrap';

export default function ConfirmModal(props: Props) {
  return (
    <Modal
      size="sm"
      show={props.show}
      onHide={props.onClose}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>삭제 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-break">
        {props.contentName}을 정말 삭제하시겠습니까?
      </Modal.Body>
      <Modal.Footer
        className="justify-content-center p-2"
        data-cy="confirmButtons"
      >
        <Button variant="primary" onClick={props.onDelete}>
          삭제
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface Props {
  contentName: string;
  show: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}
