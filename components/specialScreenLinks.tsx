import { Col, Row } from 'react-bootstrap';
import styles from './specialScreenLinks.module.css';

export default function SpecialScreenLinks() {
  return (
    <Row className={styles.border}>
      <Col className="d-flex p-0">
        <h5 className="me-auto">
          <b>스페셜관</b>
        </h5>
        <a href="">더보기 {'>'}</a>
      </Col>
    </Row>
  );
}
