import { Alert } from 'react-bootstrap';
import styles from './myAlert.module.css';

export default function MyAlert(props: Props) {
  return (
    <Alert variant="warning">
      <span className="material-symbols-rounded me-1">
        <span className={styles.warning}>warning</span>
      </span>
      {props.message}
    </Alert>
  );
}

interface Props {
  message: string;
}
