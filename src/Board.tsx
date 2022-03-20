import './Board.css';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Piece } from 'models/piece';
import { Player } from 'models/player';
import { useGameInfo, useGameState } from 'stores/hooks';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';

export const Board = observer(() => {
  const gameState = useGameState();
  const gameInfo = useGameInfo();

  const getPieceColor = (piece: Piece) => {
    const isPlayerOne = piece.player === Player.PlayerOne;

    return isPlayerOne ? 'red' : 'black';
  };

  return (
    <>
      <div className='flex'>
        <BoardInfo />
      </div>
      <div
        className='Board'
        style={{
          width: gameInfo.dimensions.cols * 50,
          height: gameInfo.dimensions.cols * 50,
        }}
      >
        {/** TODO(2): placing game pieces
         * - how do utilize the provided board piece component to visualize the game state?
         */}
        {gameState.board.map(
          (piece, i) =>
            piece && (
              <BoardPiece
                key={i}
                column={piece.column}
                row={piece.row}
                color={getPieceColor(piece)}
              />
            )
        )}
        {Array.from(Array(gameInfo.dimensions.rows), (_, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(gameInfo.dimensions.cols), (_, column) => (
              <SlotButton
                key={`slot-${column}-${row}`}
                column={column}
                row={row}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
});

export interface SlotButtonProps {
  column: number;
  row: number;
}

export const SlotButton = observer(function SlotButton({
  column,
  row: rowIndex,
}: SlotButtonProps) {
  const gameState = useGameState();
  const gameInfo = useGameInfo();

  const isDisabled =
    gameState.winner !== Player.None ||
    gameState.board.some((piece) => {
      const row = gameInfo.dimensions.rows - rowIndex - 1;
      return piece.column === column && piece.row === row;
    }); /* todo shouldn't have to pass in width */

  const handleClick = () => runInAction(() => gameState.placePiece({ column }));

  return (
    <button
      className='Board-Slot'
      disabled={isDisabled}
      onClick={handleClick}
    />
  );
});
