import styles from './seatButton.module.css';

export default function seatButton(props: Props) {
  return (
    <button
      type="button"
      className={styles[props.type]}
      tabIndex={props.type === 'unselectable' ? -1 : 0}
    >
      {props.type === 'unselectable' ? (
        <div className={styles.line} />
      ) : (
        props.value
      )}
    </button>
  );
}

interface Props {
  value?: number;
  type: seatButtonType;
}

export type seatButtonType = 'general' | 'selected' | 'unselectable';
