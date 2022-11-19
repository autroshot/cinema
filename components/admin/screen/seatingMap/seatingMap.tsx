import SeatButton, { seatButtonType } from './seatButton';
import styles from './seatingMap.module.css';
import BlankTr from './blankTr';
import BlankTd from './blankTd';

export default function SeatingMap({ values }: Props) {
  return (
    <>
      <div className="bg-black text-white p-1">
        <div className="d-grid text-white bg-secondary text-center p-1 m-1">
          S C R E E N
        </div>
        <div className="d-flex align-items-center justify-content-center text-center">
          <div className={styles.overflow}>
            <table>
              <tbody>
                <BlankTr />
                {createTableContent()}
                <BlankTr />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  function createTableContent() {
    const trs: JSX.Element[] = [];

    const rowAisles = values.aisles.filter((aisle) => aisle.typeId === 1);
    const columnAisles = values.aisles.filter((aisle) => aisle.typeId === 2);
    const blankRowNumbers = calculateActualNumbers(rowAisles);
    const blankColumnNumbers = calculateActualNumbers(columnAisles);

    for (
      let currentRow = 1, indexRow = 1;
      currentRow <= values.totalRow + rowAisles.length;
      currentRow += 1
    ) {
      const tds: JSX.Element[] = [];

      if (blankRowNumbers.includes(currentRow)) {
        trs.push(<BlankTr key={currentRow} />);
        continue;
      }

      for (
        let currentColumn = 1, indexColumn = 1;
        currentColumn <= values.totalColumn + columnAisles.length;
        currentColumn += 1
      ) {
        if (blankColumnNumbers.includes(currentColumn)) {
          tds.push(<BlankTd key={currentColumn} />);
          continue;
        }

        const seatType = getSeatType(
          indexRow,
          indexColumn,
          values.unselectableSeats
        );
        if (seatType === 'nonexistent') {
          tds.push(<BlankTd key={currentColumn} />);
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
          <BlankTd />
          {tds}
          <BlankTd />
        </tr>
      );
      indexRow += 1;
    }

    return trs;
  }

  function calculateActualNumbers(aisles: { typeId: number; no: number }[]) {
    let count = 0;
    return aisles.map((aisle) => {
      const number = aisle.no + count;
      count += 1;
      return number;
    });
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
