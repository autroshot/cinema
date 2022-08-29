import { useState } from 'react';
import { Button, Col, Collapse, Row } from 'react-bootstrap';
import styles from './contents.module.css';
import Theater from './theater';

export default function TheaterAndScreensLayout({
  theaterIncludingScreens,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Theater
        id={theaterIncludingScreens.id}
        name={theaterIncludingScreens.name}
        open={open}
        onClick={() => setOpen(!open)}
      />
      <tr id={`${theaterIncludingScreens.id}-theater-screens`}>
        <td colSpan={2} className="p-0">
          <Collapse in={open}>
            <div id={`${theaterIncludingScreens.id}-theater-screens`}>
              <div className="mx-3 my-2">
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
            </div>
          </Collapse>
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
