import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import image1 from '../../public/dummy/carousel-trailer-리미트.jpg';
import image2 from '../../public/dummy/carousel-trailer-불릿트레인.jpg';
import image3 from '../../public/dummy/carousel-trailer-한산.jpg';
import styles from './trailerCarousel.module.css';
import { useState } from 'react';
import TrailerSlideContent from './trailerSlideContent';

export default function TrailerCarousel() {
  const [showModal, setShowModal] = useState(false);

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
          <TrailerSlideContent
            title="리미트"
            src={image1}
            onClick={handleClick}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <TrailerSlideContent
            title="불릿트레인"
            src={image2}
            onClick={handleClick}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <TrailerSlideContent
            title="한산"
            src={image3}
            onClick={handleClick}
          />
        </SwiperSlide>
      </Swiper>
      <Modal
        size="lg"
        show={showModal}
        onHide={handleHide}
        aria-labelledby="trailer"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="trailer">트레일러</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 d-flex">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube-nocookie.com/embed/H150mI_LPV4?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );

  function handleClick() {
    setShowModal(true);
  }

  function handleHide() {
    setShowModal(false);
  }
}
