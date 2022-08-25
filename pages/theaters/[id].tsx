import { Col, Container, Row } from 'react-bootstrap';
import Info from 'components/theater/info';
import RecommendedMovie from 'components/theater/recommendedMovie';
import styles from './theater.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GetResponseData } from 'pages/api/theaters/[id]';
import { prisma } from 'db';

export default function Theater({ theater }: Props) {
  if (theater === null) return <>데이터가 없습니다.</>;

  return (
    <Container className="my-3">
      {/* TODO: 개발용 */}
      <div>현재 id: {theater.id}</div>
      <h1 className="d-inline">{theater.name}</h1>{' '}
      <span className="material-symbols-outlined">
        <span className={styles.favoriteBorder} role="button">
          favorite
        </span>
      </span>
      <section className="my-3">
        <Row className="row-cols-1 row-cols-sm-2">
          <Col>
            <Info streetAddress={theater.street_address} />
          </Col>
          <Col className="mt-3 mt-sm-0">
            <RecommendedMovie />
          </Col>
        </Row>
      </section>
      <section>상영시간표</section>
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

  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const theater = await prisma.theater.findUnique({
    where: {
      id: +id,
    },
  });

  return {
    props: {
      theater: theater,
    },
  };
};

interface Props {
  theater: GetResponseData;
}
