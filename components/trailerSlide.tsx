import Image, { StaticImageData } from 'next/image';
import { SwiperSlide } from 'swiper/react';
import styles from '../styles/TrailerSlide.module.css';
import playBtn from '../public/play-btn.png';

export default function TrailerSlide(props: Props) {
  return (
    <SwiperSlide className={styles.trailerSlide}>
      <button
        type="button"
        className={styles.trailerButton}
        onClick={props.onClick}
      >
        <Image src={props.src} alt={`${props.title} 트레일러`} />
        <div className="position-absolute top-50 start-50 translate-middle">
          <Image src={playBtn} alt="플레이 버튼" />
        </div>
      </button>
    </SwiperSlide>
  );
}

interface Props {
  title: string;
  src: StaticImageData;
  onClick: () => void;
}
