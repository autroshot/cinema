import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import image1 from '../public/dummy/carousel-trailer-리미트.jpg';
import image2 from '../public/dummy/carousel-trailer-불릿트레인.jpg';
import image3 from '../public/dummy/carousel-trailer-한산.jpg';
import playBtn from '../public/play-btn.png';
import styles from '../styles/TrailerCarousel.module.css';
import { useState } from 'react';

export default function TrailerCarousel() {
  const [showModal, setShowModal] = useState(false);

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
          <button
            type="button"
            className={styles.trailerButton}
            onClick={handleClick}
          >
            <Image src={image1} alt="리미트 트레일러" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <Image src={playBtn} alt="플레이 버튼" />
            </div>
          </button>
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <button type="button" className={styles.trailerButton}>
            <Image src={image2} alt="불릿트레인 트레일러" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <Image src={playBtn} alt="플레이 버튼" />
            </div>
          </button>
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <button type="button" className={styles.trailerButton}>
            <Image src={image3} alt="한산 트레일러" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <Image src={playBtn} alt="플레이 버튼" />
            </div>
          </button>
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
