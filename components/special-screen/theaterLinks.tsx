import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';

export default function TheaterLinks(props: Props) {
  return (
    <Row className="row-cols-3 row-cols-lg-6 g-0 text-center">
      {props.theaterLinks.map((theaterLink, index) => {
        return (
          (<Link key={index} href={theaterLink.href}>

            <Col className="col py-3 border">{theaterLink.name}</Col>

          </Link>)
        );
      })}
    </Row>
  );
}

export interface Props {
  theaterLinks: Array<theaterLink>;
}

interface theaterLink {
  name: string;
  href: string;
}
