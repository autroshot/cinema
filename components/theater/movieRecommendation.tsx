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
            {/* TODO: 미구현 */}
            autroshot님
            <br />
            <b>{props.theaterName}</b>에서
            <br />
            {/* TODO: 미구현 */}
            <span className={styles.movieTitle}>한산: 용의 출현</span>
            <br />
            어떠세요?
          </div>
          <hr />
          <div>
            {/* TODO: 미구현 */}
            한산: 용의 출현
            <br />
            {/* TODO: 미구현 */}
            예매율 33.5%{' '}
            <span className="material-symbols-outlined">
              {/* TODO: 미구현 */}
              <span className={styles.grade}>grade</span>
            </span>{' '}
            9.4
          </div>
          <hr />
          <div>
            <ShareURL />
            <span className="material-symbols-outlined me-3" role="button">
              {/* TODO: 미구현 */}
              <span className={styles.favorite}>favorite</span>
            </span>
            {/* TODO: 미구현 */}
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
