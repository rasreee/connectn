import './Board.css';

import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Piece } from 'models/piece';
import { Player } from 'models/player';
import { Slot, slotUtils } from 'models/slot';
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

export const SlotButton = observer(({ column, row }: SlotButtonProps) => {
  const gameState = useGameState();
  const gameInfo = useGameInfo();

  const getIsSlotDisabled = (slot: Slot) =>
    computed(
      () =>
        Boolean(gameState.winner) ||
        slotUtils.isTaken(
          slotUtils.normalize(
            slot,
            gameInfo.dimensions.cols
          ) /* todo shouldn't have to pass in width */,
          gameState.board
        )
    ).get();

  return (
    <button
      className='Board-Slot'
      disabled={getIsSlotDisabled({ column, row })}
      onClick={() => gameState.placePiece({ column })}
    />
  );
});
