import Link from 'next/link';
import { Button, Col, Collapse, Row } from 'react-bootstrap';
import styles from './screens.module.css';

export default function Screens(props: Props) {
  return (
    <tr>
      <td colSpan={2} className="p-0">
        <Collapse in={props.open}>
          <div id={`${props.theaterId}-theater-screens`}>
            <div className="mx-3 my-2">
              <Row>
                {props.screens.map((screen) => {
                  return (
                    <Col xs={2} sm={1} key={screen.no} className="mb-1">
                      <Link
                        href={`/admin/screens/${props.theaterId}/${screen.no}`}
                      >
                        <a>
                          <span className={styles.wordBreak}>
                            {screen.no}관
                          </span>
                        </a>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
              <Button size="sm" className="my-2">
                상영관 만들기
              </Button>
            </div>
          </div>
        </Collapse>
      </td>
    </tr>
  );
}

interface Props {
  theaterId: number;
  screens: {
    no: number;
  }[];
  open: boolean;
}
