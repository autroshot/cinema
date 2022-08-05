import { Container } from 'react-bootstrap';
import styles from './super-plex-g.module.css';

export default function SuperPlexG() {
  return (
    <>
      <Container fluid className="p-0 bg-black">
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
      </Container>
      <Container></Container>
    </>
  );
}
