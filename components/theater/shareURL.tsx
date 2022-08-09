import { OverlayTrigger, Popover } from 'react-bootstrap';

export default function ShareURL() {
  return (
    <OverlayTrigger
      placement="top"
      show={false}
      overlay={
        <Popover id="popover-url">
          <Popover.Body>URL이 복사되었습니다.</Popover.Body>
        </Popover>
      }
    >
      <span className="material-symbols-outlined me-3" role="button">
        share
      </span>
    </OverlayTrigger>
  );
}
