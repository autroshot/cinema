import styles from './theater.module.css';

export default function Theater(props: Props) {
  return (
    <tr
      role="button"
      className={styles.cursorPointer}
      tabIndex={0}
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      aria-controls={`${props.id}-theater-screens`}
      aria-expanded={props.open}
    >
      <td>{props.id}</td>
      <td className="d-flex">
        <span className="me-auto">{props.name}</span>
        <span
          className={
            props.open ? styles.openedCollapseArrow : styles.closedCollapseArrow
          }
        >
          <span className="material-symbols-outlined fs-4">expand_less</span>
        </span>
      </td>
    </tr>
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.click();
    }
  }
}

interface Props {
  open: boolean;
  id: number;
  name: string;
  onClick: () => void;
}
