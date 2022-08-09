import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import Info from '../../components/theater/info';
import RecommendedMovie from '../../components/theater/recommendedMovie';
import styles from './theater.module.css';

export default function Theater() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container className="my-3">
      <div>현재 id: {id}</div>
      <h1 className="d-inline">월드타워</h1>{' '}
      <span className="material-symbols-outlined">
        <span className={styles.favoriteBorder} role="button">
          favorite
        </span>
      </span>
      <section className="my-3">
        <Row className="row-cols-1 row-cols-sm-2">
          <Col>
            <Info />
          </Col>
          <Col className="mt-3 mt-sm-0">
            <RecommendedMovie />
          </Col>
        </Row>
      </section>
      <section>상영시간표</section>
    </Container>
  );
}
