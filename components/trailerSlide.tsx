import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';
import styles from '../styles/TrailerSlide.module.css';

export default function TrailerSlide() {
  return (
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
  );
}
