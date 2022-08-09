import { useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { setTimeout } from 'timers';

export default function ShareURL() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show === true) {
      setTimeout(() => setShow(false), 1500);
    }
  });

  return (
    <OverlayTrigger
      placement="top"
      show={show}
      overlay={
        <Popover id="popover-url">
          <Popover.Body>URL이 복사되었습니다.</Popover.Body>
        </Popover>
      }
    >
      <span
        className="material-symbols-outlined me-3"
        role="button"
        onClick={() => setShow(true)}
      >
        share
      </span>
    </OverlayTrigger>
  );
}
