import styles from './common.module.css';

export default function BlankTd() {
  return (
    <td className={styles.td}>
      <div className={styles.td} />
    </td>
  );
}
