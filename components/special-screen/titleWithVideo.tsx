import Image, { StaticImageData } from 'next/image';
import { Container } from 'react-bootstrap';
import styles from './titleWithVideo.module.css';

export default function TitleWithVideo(props: Props) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <video
          className={styles.video}
          src={props.src}
          poster={props.poster}
          muted
          autoPlay
          loop
          playsInline
        />
      </div>
      <div className="position-absolute top-50 start-50 translate-middle w-100 h-100">
        <Container className="h-100 d-flex flex-column">
          <div className="mt-auto mb-3">
            <Image src={props.logo} alt={props.alt} />
            <h5 className="text-white mt-3 ms-5">{props.text}</h5>
          </div>
        </Container>
      </div>
    </>
  );
}

export interface Props {
  src: string;
  poster: string;
  logo: StaticImageData;
  alt: string;
  text: string;
}
