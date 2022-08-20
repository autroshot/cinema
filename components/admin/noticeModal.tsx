import { Button, Modal } from 'react-bootstrap';

export default function NoticeModal(props: Props) {
  return (
    <Modal
      size="sm"
      show={true}
      onHide={handleClose}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>등록이 완료되었습니다.</Modal.Body>
      <Modal.Footer className="justify-content-center p-2">
        <Button variant="primary" onClick={handleClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );

  interface Props {
    show: boolean;
    onClose: () => void;
  }

  function handleClose() {
    setShowCompletion(false);
  }
}
