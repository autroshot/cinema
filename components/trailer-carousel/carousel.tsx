import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import image1 from '../../public/dummy/carousel-trailer-limit.jpg';
import image2 from '../../public/dummy/carousel-trailer-bullet-train.jpg';
import image3 from '../../public/dummy/carousel-trailer-hansan.jpg';
import styles from './carousel.module.css';
import { useState } from 'react';
import SlideContent from './slideContent';
import YoutubeModal from './youtubeModal';

export default function Carousel() {
  const [youtubeId, setYoutubeId] = useState<null | string>(null);

  const SLIDE_PARAMS = [
    { title: '리미트', src: image1, youtubeId: 'H150mI_LPV4' },
    { title: '불릿트레인', src: image2, youtubeId: '_ics0ClH5TQ' },
    { title: '한산', src: image3, youtubeId: 'GduEtmvwcI0' },
  ];

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop
      >
        <SwiperSlide className={styles.trailerSlide}>
          <SlideContent
            title="리미트"
            src={image1}
            onClick={() => handleClick('H150mI_LPV4')}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <SlideContent
            title="불릿트레인"
            src={image2}
            onClick={() => handleClick('_ics0ClH5TQ')}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <SlideContent
            title="한산"
            src={image3}
            onClick={() => handleClick('GduEtmvwcI0')}
          />
        </SwiperSlide>
      </Swiper>
      <YoutubeModal onHide={handleHide} youtubeId={youtubeId} />
    </>
  );

  function handleClick(newYoutubeId: string) {
    setYoutubeId(newYoutubeId);
  }

  function handleHide() {
    setYoutubeId(null);
  }
}
