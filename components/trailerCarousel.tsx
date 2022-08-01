import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import trailer1 from '../public/dummy/carousel-trailer-1.jpg';
import trailer2 from '../public/dummy/carousel-trailer-2.jpg';
import trailer3 from '../public/dummy/carousel-trailer-3.jpg';
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
            <Image src={trailer1} alt="리미트 트레일러" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <Image src={playBtn} alt="플레이 버튼" />
            </div>
          </button>
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <button type="button" className={styles.trailerButton}>
            <Image src={trailer2} alt="불릿트레인 트레일러" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <Image src={playBtn} alt="플레이 버튼" />
            </div>
          </button>
        </SwiperSlide>
        <SwiperSlide className={styles.trailerSlide}>
          <button type="button" className={styles.trailerButton}>
            <Image src={trailer3} alt="한산 트레일러" />
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
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
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
