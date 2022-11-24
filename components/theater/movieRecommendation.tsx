import Image from 'next/image';
import { Button, Col, Row } from 'react-bootstrap';
import movieImage from 'public/images/dummy/movies/01.jpg';
import styles from './movieRecommendation.module.css';
import ShareURL from './shareURL';

export default function MovieRecommendation(props: Props) {
  return (
    <section className="bg-light p-3 rounded-2">
      <Row>
        <Col className="col">
          <div>
            autroshot님
            <br />
            <b>{props.theaterName}</b>에서
            <br />
            <span className={styles.movieTitle}>한산: 용의 출현</span>
            <br />
            어떠세요?
          </div>
          <hr />
          <div>
            한산: 용의 출현
            <br />
            예매율 33.5%{' '}
            <span className="material-symbols-outlined">
              <span className={styles.grade}>grade</span>
            </span>{' '}
            9.4
          </div>
          <hr />
          <div>
            <ShareURL />
            <span className="material-symbols-outlined me-3" role="button">
              <span className={styles.favorite}>favorite</span>
            </span>
            <Button className="btn-sm btn-primary">예매하기</Button>
          </div>
        </Col>
        <Col className="text-center">
          <Image
            src={movieImage}
            alt="한산: 용의 출현"
            width={178.5}
            height={255}
            className="float-end"
          />
        </Col>
      </Row>
    </section>
  );
}

interface Props {
  theaterName: string;
}
