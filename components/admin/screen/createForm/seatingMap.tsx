import SeatButton from './seatButton';
import styles from './seatingMap.module.css';

export default function SeatingMap() {
  return (
    <div className="bg-black text-white p-1 pb-5">
      <div className="d-grid text-white bg-secondary text-center p-1 m-1">
        S C R E E N
      </div>
      <div className="bg-black text-white d-flex align-items-center justify-content-center text-center">
        <table>
          <tbody>
            <tr>
              <td>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>A</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>
                <SeatButton type="general" value={1} />
              </td>
              <td className={styles.td}>
                <SeatButton type="selected" value={2} />
              </td>
              <td className={styles.td}>
                <SeatButton type="unselectable" value={3} />
              </td>
              <td className={styles.td}>
                <SeatButton type="general" value={4} />
              </td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>B</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>
                <SeatButton type="general" value={15} />
              </td>
              <td className={styles.td}>
                <SeatButton type="general" value={55} />
              </td>
              <td className={styles.td}>
                <SeatButton type="general" value={99} />
              </td>
              <td className={styles.td}>
                <SeatButton type="selected" value={11} />
              </td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>C</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>9</td>
              <td className={styles.td}>10</td>
              <td className={styles.td}>11</td>
              <td className={styles.td}>12</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>D</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>13</td>
              <td className={styles.td}>14</td>
              <td className={styles.td}>15</td>
              <td className={styles.td}>16</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
            <tr>
              <td>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>D</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>13</td>
              <td className={styles.td}>14</td>
              <td className={styles.td}>15</td>
              <td className={styles.td}>16</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
            <tr>
              <td className={styles.td}>D</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>13</td>
              <td className={styles.td}>14</td>
              <td className={styles.td}>15</td>
              <td className={styles.td}>16</td>
              <td className={styles.td}>&#160;</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>4</td>
              <td className={styles.td}>&#160;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
