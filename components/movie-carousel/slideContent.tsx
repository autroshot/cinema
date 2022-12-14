import Image, { StaticImageData } from 'next/image';
import { Button, Card } from 'react-bootstrap';
import styles from './slideContent.module.css';

export default function SlideContent(props: Props) {
  const MAX_TITLE_LENGTH = 11;

  return (
    <Card className={styles.card}>
      <div className={styles.imageBox}>
        <Image src={props.image} alt={props.title} />
        {!parseCSSClass(props.rating) ? null : (
          <span className="position-absolute top-4 end-5">
            <span className={styles[parseCSSClass(props.rating) as string]}>
              {parseShortText(props.rating)}
            </span>
          </span>
        )}
        <span className="position-absolute bottom-n1 start-5">
          <em className={styles.ranking}>{props.ranking}</em>
        </span>
        <div className={styles.movieButtonsContainer}>
          <div className="position-absolute top-50 start-50 translate-middle d-grid gap-2 col-6 mx-auto">
            <Button variant="outline-light">예매하기</Button>
            <Button variant="outline-light">상세정보</Button>
          </div>
        </div>
      </div>
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>
          {props.title.length <= MAX_TITLE_LENGTH
            ? props.title
            : props.title.slice(0, MAX_TITLE_LENGTH) + '...'}
        </Card.Title>
        <Card.Text className={styles.text}>
          예매율 {props.salesShare.toFixed(1)}% |{' '}
          <span className="material-symbols-outlined">
            <span className={styles.grade}>grade</span>
          </span>{' '}
          {props.reviewScore.toFixed(1)} |{' '}
          {props.liked ? (
            <span className="material-symbols-outlined">
              <span className={styles.favorite} role="button">
                favorite
              </span>
            </span>
          ) : (
            <span className="material-symbols-outlined">
              <span className={styles.favoriteBorder} role="button">
                favorite
              </span>
            </span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

interface Props {
  image: StaticImageData;
  rating: string;
  ranking: number;
  title: string;
  salesShare: number;
  reviewScore: number;
  liked: boolean;
}

function parseCSSClass(rating: string) {
  switch (rating) {
    case '전체관람가':
      return 'ratingAll';
    case '12세이상관람가':
      return 'rating12';
    case '15세이상관람가':
      return 'rating15';
    case '청소년관람불가':
      return 'ratingX';
    case '제한상영가':
      return 'ratingRestricted';
    default:
      return null;
  }
}

function parseShortText(rating: string) {
  switch (rating) {
    case '전체관람가':
      return '전체';
    case '12세이상관람가':
      return '12';
    case '15세이상관람가':
      return '15';
    case '청소년관람불가':
      return '청불';
    case '제한상영가':
      return '제한';
    default:
      return null;
  }
}
