import times from 'lodash.times';

import styles from './Board.module.css';
import { SlotButton } from './SlotButton';

export const GridBackdrop = function GridBackdrop({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}) {
  return (
    <>
      {/* Grid backdrop */}
      {times(rows, (row) => (
        <div key={`row-${row}`}>
          <GridRow row={row} cols={cols} />
        </div>
      ))}
    </>
  );
};

export const GridRow = function GridRow({
  row,
  cols,
}: {
  row: number;
  cols: number;
}) {
  return (
    <div className={styles.gridRow}>
      {times(cols, (column) => (
        <SlotButton key={`slot-${column}-${row}`} column={column} row={row} />
      ))}
    </div>
  );
};
