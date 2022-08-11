import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import movie1 from 'public/images/dummy/movies/01.jpg';
import movie2 from 'public/images/dummy/movies/02.jpg';
import movie3 from 'public/images/dummy/movies/03.jpg';
import movie4 from 'public/images/dummy/movies/04.jpg';
import movie5 from 'public/images/dummy/movies/05.jpg';
import movie6 from 'public/images/dummy/movies/06.jpg';
import movie7 from 'public/images/dummy/movies/07.jpg';
import movie8 from 'public/images/dummy/movies/08.jpg';
import movie9 from 'public/images/dummy/movies/09.jpg';
import movie10 from 'public/images/dummy/movies/10.jpg';
import SlideContent from './slideContent';

export default function Carousel() {
  const DUMMY_SLIDE_PARAMS = [
    {
      image: movie1,
      rating: '12세이상관람가',
      title: '한산: 용의 출현',
      salesShare: 44.4,
      reviewScore: 9.4,
      liked: true,
    },
    {
      image: movie2,
      rating: '12세이상관람가',
      title: '비상선언',
      salesShare: 35.4,
      reviewScore: 8,
      liked: false,
    },
    {
      image: movie3,
      rating: '전체관람가',
      title: '미니언즈2',
      salesShare: 10,
      reviewScore: 9,
      liked: true,
    },
    {
      image: movie4,
      rating: '12세이상관람가',
      title: '탑건: 매버릭',
      salesShare: 5,
      reviewScore: 9.8,
      liked: false,
    },
    {
      image: movie5,
      rating: '전체관람가',
      title: '뽀로로 극장판 드래곤캐슬 대모험',
      salesShare: 3.1,
      reviewScore: 9.8,
      liked: false,
    },
    {
      image: movie6,
      rating: '15세이상관람가',
      title: '헌트',
      salesShare: 2.9,
      reviewScore: 10,
      liked: true,
    },
    {
      image: movie7,
      rating: '12세이상관람가',
      title: '외계+인 1부',
      salesShare: 0.9,
      reviewScore: 0,
      liked: true,
    },
    {
      image: movie8,
      rating: '12세이상관람가',
      title: 'SEVENTEEN WORLD TOUR [BE THE SUN] - HOUSTON : LIVE VIEWING',
      salesShare: 0.7,
      reviewScore: 8.5,
      liked: false,
    },
    {
      image: movie9,
      rating: '청소년관람불가',
      title: '가나다라마바사아자차카타파하',
      salesShare: 0.5,
      reviewScore: 10,
      liked: true,
    },
    {
      image: movie10,
      rating: '제한상영가',
      title: '명탐점 코난: 할로윈의 신부',
      salesShare: 0.1,
      reviewScore: 8.5,
      liked: false,
    },
  ];

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      breakpoints={{ 576: { slidesPerView: 5 } }}
      navigation
    >
      {DUMMY_SLIDE_PARAMS.map((slideParam, index) => {
        return (
          <SwiperSlide key={slideParam.title}>
            <SlideContent
              image={slideParam.image}
              rating={slideParam.rating}
              ranking={index + 1}
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
