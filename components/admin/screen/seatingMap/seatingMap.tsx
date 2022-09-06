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
                <td>&nbsp;</td>
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
    let rowAisles = calculateAisles(values.aisles, 'row');
    let columnAisles = calculateAisles(values.aisles, 'column');

    for (
      let currentRow = 1, indexRow = 1;
      currentRow <= values.totalRow + rowAisles.length;
      currentRow += 1
    ) {
      const tds: JSX.Element[] = [];

      if (rowAisles.includes(currentRow)) {
        trs.push(
          <tr key={currentRow}>
            <td className={styles.td}>&nbsp;</td>
          </tr>
        );
        continue;
      }

      for (
        let currentColumn = 1, indexColumn = 1;
        currentColumn <= values.totalColumn + columnAisles.length;
        currentColumn += 1
      ) {
        if (columnAisles.includes(currentColumn)) {
          tds.push(
            <td key={currentColumn} className={styles.td}>
              &nbsp;
            </td>
          );
          continue;
        }

        const seatType = getSeatType(
          indexRow,
          indexColumn,
          values.unselectableSeats
        );
        if (seatType === 'nonexistent') {
          tds.push(
            <td key={currentColumn} className={styles.td}>
              &nbsp;
            </td>
          );
          indexColumn += 1;
          continue;
        }

        tds.push(
          <td key={currentColumn} className={styles.td}>
            <SeatButton type={seatType} value={indexColumn} />
          </td>
        );

        indexColumn += 1;
      }

      trs.push(
        <tr key={currentRow}>
          <td className={styles.td}>{numberToBase26(indexRow)}</td>
          <td className={styles.td}>&nbsp;</td>
          {tds}
          <td className={styles.td}>&nbsp;</td>
        </tr>
      );
      indexRow += 1;
    }

    return trs;
  }

  function calculateAisles(
    aisles: {
      typeId: number;
      no: number;
    }[],
    type: 'row' | 'column'
  ) {
    let result: number[];

    result = [
      ...new Set(
        aisles
          .filter((aisle) => aisle.typeId === (type === 'row' ? 1 : 2))
          .map((aisle) => aisle.no)
      ),
    ].sort((a, b) => a - b);

    let count = 0;
    result = result.map((value) => {
      value += count;
      count += 1;
      return value;
    });

    return result;
  }

  function getSeatType(
    indexRow: number,
    indexColumn: number,
    unselectableSeats: {
      typeId: number;
      row: number;
      column: number;
    }[]
  ): seatButtonType | 'nonexistent' {
    const targetUnselectableSeats = unselectableSeats.filter(
      (unselectableSeat) => {
        return (
          unselectableSeat.row === indexRow &&
          unselectableSeat.column === indexColumn
        );
      }
    );
    if (targetUnselectableSeats.length === 0) return 'general';
    const isNonexistentSeat = targetUnselectableSeats.some(
      (unselectableSeat) => {
        return unselectableSeat.typeId === 1;
      }
    );
    if (isNonexistentSeat) return 'nonexistent';
    return 'unselectable';
  }

  function numberToBase26(value: number, tail = ''): string {
    if (value <= 26) {
      return `${String.fromCharCode(value + 64)}${tail}`;
    }

    const remainder = value % 26 || 26;
    const division = Math.trunc(value / 26) - (remainder === 26 ? 1 : 0);

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
    typeId: number;
    row: number;
    column: number;
  }[];
}
