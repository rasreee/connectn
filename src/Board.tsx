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

  const getIsSlotDisabled = (slot: Slot) =>
    computed(
      () =>
        Boolean(gameState.winner) ||
        slotUtils.isTaken(
          slotUtils.normalize(
            slot,
            gameInfo.dimensions.cols
          ) /* todo shouldn't have to pass in width */,
          gameState.board.flat()
        )
    ).get();

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
        {gameState.board
          .flat()
          .map(
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
              <button
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                disabled={getIsSlotDisabled({ column, row })}
                onClick={() => gameState.placePiece({ column })}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
});
