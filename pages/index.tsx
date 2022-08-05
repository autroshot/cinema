import Head from 'next/head';
import { Container } from 'react-bootstrap';
import TrailerCarousel from '../components/trailer-carousel/carousel';
import MovieCarousel from '../components/movie-carousel/carousel';
import SpecialScreenLinks from '../components/specialScreenLinks';

export default function Home() {
  return (
    <>
      <Head>
        <title>시네마</title>
      </Head>
      <Container fluid className="bg-black p-0">
        <TrailerCarousel />
      </Container>
      <Container fluid className="bg-black">
        <Container className="px-0 py-3">
          <MovieCarousel />
        </Container>
      </Container>
      <Container className="py-5">
        <SpecialScreenLinks />
      </Container>
    </>
  );
}
