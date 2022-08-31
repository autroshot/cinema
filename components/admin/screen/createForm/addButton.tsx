import { Button } from 'react-bootstrap';
import styles from './addButton.module.css';

export default function AddButton() {
  return (
    <Button className="mt-3 py-1 text-center">
      <span className="material-symbols-outlined fs-3">
        <span className={styles.color}>add_circle</span>
      </span>
    </Button>
  );
}
