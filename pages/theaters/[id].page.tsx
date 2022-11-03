import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Info from 'components/theater/info';
import MovieRecommendation from 'components/theater/movieRecommendation';
import styles from './theater.module.css';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { GetResponseData } from 'pages/api/theaters/[theaterId]/index.page';
import { prisma } from 'db';
import { useRouter } from 'next/router';

export default function Theater({
  theater,
  screenCount = 0,
  seatCount = 0,
}: Props) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Container className="my-3">
        <div className="text-center">
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">불러오는 중...</span>
          </Spinner>
        </div>
      </Container>
    );
  }
  if (theater === null)
    return <Container className="my-3">데이터가 없습니다.</Container>;

  return (
    <Container className="my-3">
      <h1 className="d-inline" data-cy="title">
        {theater.name}
      </h1>{' '}
      <span className="material-symbols-outlined">
        <span className={styles.favoriteBorder} role="button">
          favorite
        </span>
      </span>
      <section className="my-3">
        <Row className="row-cols-1 row-cols-sm-2">
          <Col>
            <Info
              screenCount={screenCount}
              seatCount={seatCount}
              streetAddress={theater.street_address}
              subway={theater.subway}
              bus={theater.bus}
              car={theater.car}
              parking={theater.parking}
              googleMapsPlaceId={theater.google_maps_place_id}
            />
          </Col>
          <Col className="mt-3 mt-sm-0">
            <MovieRecommendation theaterName={theater.name} />
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const theaters = await prisma.theater.findMany({
    select: {
      id: true,
    },
  });

  const paths = theaters.map((theater) => {
    return { params: { id: theater.id.toString() } };
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);
  const theater = await prisma.theater.findUnique({
    where: {
      id: id,
    },
  });

  if (theater === null) {
    return {
      props: {
        theater,
      },
    };
  } else {
    const screenCount = await prisma.screen.count({
      where: {
        theater_id: id,
      },
    });

    const totalRowAndTotalColumnOfScreens = await prisma.screen.findMany({
      where: {
        theater_id: id,
      },
      select: {
        total_row: true,
        total_column: true,
      },
    });
    const nonexistentSeatCount = await prisma.unselectable_seat.count({
      where: {
        theater_id: id,
        unselectable_seat_type_id: 1,
      },
    });
    const seatCount =
      totalRowAndTotalColumnOfScreens.reduce(
        (sum, totalRowAndTotalColumnOfScreen) => {
          return (
            sum +
            totalRowAndTotalColumnOfScreen.total_row *
              totalRowAndTotalColumnOfScreen.total_column
          );
        },
        0
      ) - nonexistentSeatCount;

    return {
      props: {
        theater,
        screenCount,
        seatCount,
      },
    };
  }
};

interface Props {
  theater: GetResponseData;
  screenCount: number;
  seatCount: number;
}
