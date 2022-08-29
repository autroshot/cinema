import { Button, Col, Row } from 'react-bootstrap';
import styles from './contents.module.css';

export default function TheaterTrAndScreensTr({
  theaterIncludingScreens,
}: Props) {
  return (
    <>
      <tr role="button" className={styles.cursorPointer}>
        <td>{theaterIncludingScreens.id}</td>
        <td className="d-flex">
          {theaterIncludingScreens.name}
          <span className="material-symbols-outlined ms-auto">expand_less</span>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <div className="mx-3">
            <Row>
              {theaterIncludingScreens.screens.map((screen) => {
                return (
                  <Col xs={2} sm={1} key={screen.no} className="mb-1">
                    <span className={styles.wordBreak}>{screen.no}관</span>
                  </Col>
                );
              })}
            </Row>
            <Button size="sm" className="my-2">
              상영관 만들기
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

interface Props {
  theaterIncludingScreens: {
    screens: {
      no: number;
    }[];
    id: number;
    name: string;
  };
}
