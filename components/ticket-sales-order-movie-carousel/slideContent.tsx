import Image from 'next/image';
import { Button, Card } from 'react-bootstrap';
import styles from './slideContent.module.css';
import movie1 from '../../public/images/dummy/movies/01.jpg';

export default function SlideContent() {
  return (
    <Card className={styles.card}>
      <div className={styles.imageBox}>
        <Image src={movie1} alt={'한산'} />
        <span className="position-absolute bottom-n1 start-5">
          <em className={styles.ranking}>1</em>
        </span>
        <span className="position-absolute top-4 end-5">
          <span className={styles.rating12}>12</span>
        </span>
        <div className={styles.movieButtonsContainer}>
          <div className="position-absolute top-50 start-50 translate-middle d-grid gap-2 col-6 mx-auto">
            <Button variant="outline-light">예매하기</Button>
            <Button variant="outline-light">상세정보</Button>
          </div>
        </div>
      </div>
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>한산: 용의 출현</Card.Title>
        <Card.Text className={styles.text}>
          예매율 44.4% |{' '}
          <span className="material-icons md-18 md-grade">grade</span> 9.4 |{' '}
          <span className="material-icons md-18 md-heart">favorite</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
