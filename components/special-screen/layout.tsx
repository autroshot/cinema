import { StaticImageData } from 'next/image';
import { Children, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TheaterLinks, { Props as theaterLinksProps } from './theaterLinks';
import TitleWithVideo, { Props as titleWithVideoProps } from './titleWithVideo';

export default function Layout(props: Props) {
  return (
    <>
      <Container fluid className="position-relative p-0 bg-black">
        <TitleWithVideo
          src={props.src}
          poster={props.poster}
          logo={props.logo}
          alt={props.alt}
          text={props.text}
        />
      </Container>
      <Container className="my-5">
        <Row className="mb-2">
          <Col>
            <h5>
              <b>{props.alt} 상영시간표</b>
            </h5>
          </Col>
        </Row>
        <section>
          <TheaterLinks theaterLinks={props.theaterLinks} />
        </section>
        <section>{props.children}</section>
      </Container>
    </>
  );
}

type Props = theaterLinksProps & titleWithVideoProps & childrenProps;

interface childrenProps {
  children: ReactNode;
}
