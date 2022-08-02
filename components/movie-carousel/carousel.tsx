import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button, Card } from 'react-bootstrap';
import Image from 'next/image';
import movie1 from '../../public/images/dummy/movies/01.jpg';
import movie2 from '../../public/images/dummy/movies/02.jpg';
import styles from './carousel.module.css';
import SlideContent from './slideContent';

export default function Carousel() {
  const DUMMY_SLIDE_PARAMS = new Array(10);
  DUMMY_SLIDE_PARAMS.fill({
    image: movie1,
    rating: '12세이상관람가',
    ranking: 1,
    title: '한산: 용의 출현',
    salesShare: 44.4,
    reviewScore: 9.4,
    liked: true,
  });

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      breakpoints={{ 576: { slidesPerView: 5 } }}
      navigation
    >
      {DUMMY_SLIDE_PARAMS.map((slideParam) => {
        return (
          <SwiperSlide key={slideParam.title}>
            <SlideContent
              image={slideParam.image}
              rating={slideParam.rating}
              ranking={slideParam.ranking}
              title={slideParam.title}
              salesShare={slideParam.salesShare}
              reviewScore={slideParam.reviewScore}
              liked={slideParam.liked}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
