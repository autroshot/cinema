import Link from 'next/link';
import { Button, Modal } from 'react-bootstrap';

export default function NoticeModal(props: Props) {
  return (
    <Modal
      size="sm"
      show={props.show}
      onHide={props.onClose}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.bodyText}</Modal.Body>
      <Modal.Footer className="justify-content-center p-2">
        {props.href ? (
          <Link href={props.href}>
            <Button variant="primary" onClick={props.onClose}>
              {props.linkText}
            </Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={props.onClose}>
            확인
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

interface Props {
  show: boolean;
  bodyText: string;
  href?: string;
  linkText?: string;
  onClose: () => void;
}
