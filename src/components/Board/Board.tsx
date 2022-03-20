import './Board.css';

import { observer } from 'mobx-react-lite';
import { getPlayerColor, Player } from 'models/player';
import { useGameInfo, useGameState } from 'stores/hooks';

import { BoardPiece } from './BoardPiece';
import { GridBackdrop } from './Grid';

export const PiecesOverlay = observer(function BoardGrid() {
  const gameState = useGameState();

  return (
    <>
      {/** TODO(2): placing game pieces
       * - how do utilize the provided board piece component to visualize the game state?
       */}
      {/* Pieces overlay */}
      {gameState.board.map((column, columnIndex) =>
        column.map(
          (value, rowIndex) =>
            value !== Player.None && (
              <BoardPiece
                key={`col${columnIndex}-row${rowIndex}`}
                column={columnIndex}
                row={columnIndex}
                color={getPlayerColor(value)}
              />
            )
        )
      )}
    </>
  );
});

export const Board = observer(function Board() {
  const gameInfo = useGameInfo();

  const { cols, rows } = gameInfo.dimensions;

  return (
    <div
      className='Board'
      style={{
        width: cols * 50,
        height: cols * 50,
      }}
    >
      <PiecesOverlay />
      <GridBackdrop cols={cols} rows={rows} />
    </div>
  );
});
