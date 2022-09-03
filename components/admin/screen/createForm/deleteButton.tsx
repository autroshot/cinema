import styles from './deleteButton.module.css';

export default function DeleteButton() {
  return (
    <span className="material-symbols-outlined fs-2">
      <span className={styles.color} role="button" tabIndex={0}>
        do_not_disturb_on
      </span>
    </span>
  );
}
