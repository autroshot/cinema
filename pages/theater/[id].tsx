import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './theater.module.css';

export default function Theater() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container className="my-3">
      <div>현재 id: {id}</div>
      <h1 className="d-inline">월드타워</h1>{' '}
      <span className="material-symbols-outlined">
        <span className={styles.favoriteBorder}>favorite</span>
      </span>
      <section className="my-3">
        <Row>
          <Col>정보</Col>
          <Col>추천 영화</Col>
        </Row>
      </section>
      <section>상영시간표</section>
    </Container>
  );
}
