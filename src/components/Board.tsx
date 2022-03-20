import './Board.css';

import times from 'lodash.times';
import { observer } from 'mobx-react-lite';
import { getPlayerColor } from 'models/player';
import { useGameInfo, useGameState } from 'stores/hooks';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { SlotButton } from './SlotButton';

export const Board = observer(function Board() {
  const gameInfo = useGameInfo();

  return (
    <>
      <BoardInfo />
      <div
        className='Board'
        style={{
          width: gameInfo.dimensions.cols * 50,
          height: gameInfo.dimensions.cols * 50,
        }}
      >
        <PiecesOverlay />
        <GridBackdrop
          cols={gameInfo.dimensions.cols}
          rows={gameInfo.dimensions.rows}
        />
      </div>
    </>
  );
});

export const PiecesOverlay = observer(function BoardGrid() {
  const gameState = useGameState();

  return (
    <>
      {/** TODO(2): placing game pieces
       * - how do utilize the provided board piece component to visualize the game state?
       */}
      {/* Pieces overlay */}
      {gameState.board.map((piece, i) => (
        <BoardPiece
          key={i}
          column={piece.column}
          row={piece.row}
          color={getPlayerColor(piece.player)}
        />
      ))}
    </>
  );
});

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
        <div key={`row-${row}`} className='Board-Row'>
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
    <>
      {times(cols, (column) => (
        <SlotButton key={`slot-${column}-${row}`} column={column} row={row} />
      ))}
    </>
  );
};
