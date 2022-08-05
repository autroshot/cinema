import { Container } from 'react-bootstrap';

export default function SuperPlexG() {
  return (
    <>
      <Container fluid>
        <video
          src="/videos/video-super-plex-g.mp4"
          muted
          autoPlay
          loop
          playsInline
        />
      </Container>
      <Container></Container>
    </>
  );
}
