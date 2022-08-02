import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button, Card } from 'react-bootstrap';
import Image from 'next/image';
import movie1 from '../../public/images/dummy/movies/01.jpg';
import movie2 from '../../public/images/dummy/movies/02.jpg';
import styles from './carousel.module.css';

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      breakpoints={{ 576: { slidesPerView: 5 } }}
      navigation
    >
      <SwiperSlide>
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
      </SwiperSlide>
      <SwiperSlide>
        <Card className={styles.card}>
          <div className={styles.imageBox}>
            <Image src={movie2} alt={'비상선언'} />
            <span className="position-absolute bottom-n1 start-5">
              <em className={styles.ranking}>2</em>
            </span>
            <span className="position-absolute top-4 end-5">
              <span className={styles.ratingAll}>전체</span>
            </span>
          </div>
          <Card.Body className={styles.body}>
            <Card.Title className={styles.title}>비상선언</Card.Title>
            <Card.Text className={styles.text}>
              예매율 24.1% |{' '}
              <span className="material-icons md-18 md-grade">grade</span> 8.0 |{' '}
              <span className="material-icons md-18 md-heart">favorite</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card className={styles.card}>
          <div className={styles.imageBox}>
            <Image src={movie1} alt={'한산'} />
            <span className="position-absolute bottom-n1 start-5">
              <em className={styles.ranking}>3</em>
            </span>
            <span className="position-absolute top-4 end-5">
              <span className={styles.rating15}>15</span>
            </span>
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
      </SwiperSlide>
      <SwiperSlide>
        <Card className={styles.card}>
          <div className={styles.imageBox}>
            <Image src={movie1} alt={'한산'} />
            <span className="position-absolute bottom-n1 start-5">
              <em className={styles.ranking}>4</em>
            </span>
            <span className="position-absolute top-4 end-5">
              <span className={styles.ratingX}>청불</span>
            </span>
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
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
}
