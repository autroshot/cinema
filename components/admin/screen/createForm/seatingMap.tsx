import { FormInputs } from 'pages/admin/screens/[theaterId]/create.page';
import { string } from 'yup';
import SeatButton, { seatButtonType } from './seatButton';
import styles from './seatingMap.module.css';

export default function SeatingMap({ values }: Props) {
  return (
    <>
      {/* TODO: 테스트용 */}
      <div>{JSON.stringify(values)}</div>
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
              {createTableContent()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  function createTableContent() {
    const trs: JSX.Element[] = [];

    for (let i = 1; i <= values.totalRow; i++) {
      const tds: JSX.Element[] = [];

      for (let j = 1; j <= values.totalColumn; j++) {
        const isUnselectableSeat = values.unselectableSeats.some(
          (unselectableSeat) => {
            return unselectableSeat.row === i && unselectableSeat.column === j;
          }
        );
        const type: seatButtonType = isUnselectableSeat
          ? 'unselectable'
          : 'general';

        tds.push(
          <td key={j} className={styles.td}>
            <SeatButton type={type} value={j} />
          </td>
        );
      }

      trs.push(
        <tr key={i}>
          <td className={styles.td}>{numberToBase26(i)}</td>
          <td className={styles.td}>&#160;</td>
          {tds}
          <td className={styles.td}>&#160;</td>
        </tr>
      );
    }

    return trs;
  }

  function numberToBase26(val: number, tail = ''): string {
    if (val <= 26) {
      return `${String.fromCharCode(val + 64)}${tail}`;
    }

    const remainder = val % 26 || 26;
    const division = Math.trunc(val / 26) - (remainder === 26 ? 1 : 0);

    return numberToBase26(
      division,
      `${String.fromCharCode(remainder + 64)}${tail}`
    );
  }
}

interface Props {
  values: Values;
}

export interface Values {
  totalRow: number;
  totalColumn: number;
  aisles: { typeId: number; no: number }[];
  unselectableSeats: {
    row: number;
    column: number;
  }[];
}
