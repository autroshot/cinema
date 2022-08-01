import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import trailer1 from '../public/dummy/carousel-trailer-1.jpg';
import trailer2 from '../public/dummy/carousel-trailer-2.jpg';
import trailer3 from '../public/dummy/carousel-trailer-3.jpg';
import styles from '../styles/TrailerCarousel.module.css';

export default function TrailerCarousel() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
    >
      <SwiperSlide className={styles.trailerSlide}>
        <Image src={trailer1} alt="리미트 트레일러" />
      </SwiperSlide>
      <SwiperSlide className={styles.trailerSlide}>
        <Image src={trailer2} alt="불릿트레인 트레일러" />
      </SwiperSlide>
      <SwiperSlide className={styles.trailerSlide}>
        <Image src={trailer3} alt="한산 트레일러" />
      </SwiperSlide>
    </Swiper>
  );
}
