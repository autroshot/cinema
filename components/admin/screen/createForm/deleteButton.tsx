import styles from './deleteButton.module.css';

export default function DeleteButton() {
  return (
    <span className="material-symbols-outlined fs-2" role="button" tabIndex={0}>
      <span className={styles.color}>do_not_disturb_on</span>
    </span>
  );
}
