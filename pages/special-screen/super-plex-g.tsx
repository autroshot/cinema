import { Container } from 'react-bootstrap';
import styles from './super-plex-g.module.css';

export default function SuperPlexG() {
  return (
    <>
      <Container fluid className="position-relative p-0 bg-black">
        <div className="d-flex justify-content-center">
          <video
            className={styles.video}
            src="/videos/video-super-plex-g.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100">
          <Container>
            <h5 className="text-white">기네스북이 인정한 세계 최대 스케일</h5>
          </Container>
        </div>
      </Container>
      <Container></Container>
    </>
  );
}
