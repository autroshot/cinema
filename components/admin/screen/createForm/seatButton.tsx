import styles from './seatButton.module.css';

export default function seatButton(props: Props) {
  return (
    <button className={styles[props.type]}>
      {props.type !== 'unselectable' ? (
        props.value
      ) : (
        <div className={styles.line} />
      )}
    </button>
  );
}

interface Props {
  value?: number;
  type: 'general' | 'selected' | 'unselectable';
}
