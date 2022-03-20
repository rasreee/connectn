import './Board.css';

import { observer } from 'mobx-react-lite';
import { Piece } from 'models/piece';
import { Player } from 'models/player';
import { Slot, slotUtils } from 'models/slot';
import { useGameInfo, useGameState } from 'stores/hooks';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';
import { GameInfo } from './models/gameInfo';

const getPlayerName = (player: Player, info: GameInfo) =>
  player === Player.PlayerOne ? info.playerOneName : info.playerTwoName;

const getPieceColor = (piece: Piece, info: GameInfo) => {
  const isPlayerOne = getPlayerName(piece.player, info) === info.playerOneName;

  return isPlayerOne ? 'red' : 'black';
};

export const Board = observer(() => {
  const gameState = useGameState();
  const gameInfo = useGameInfo();

  const getIsSlotDisabled = (slot: Slot) =>
    Boolean(gameState.winner) ||
    slotUtils.isTaken(
      slotUtils.normalize(
        slot,
        gameInfo.dimensions.cols
      ) /* todo shouldn't have to pass in width */,
      gameState.board.flat()
    );

  const renderSlotText = (slotIndices: Slot) => {
    const slot = slotUtils.normalize(slotIndices, gameInfo.dimensions.rows);

    return `(${slot.column}, ${slot.row})`;
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
        {gameState.board
          .flat()
          .map(
            (piece, i) =>
              piece && (
                <BoardPiece
                  key={i}
                  column={piece.column}
                  row={piece.row}
                  color={getPieceColor(piece, gameInfo)}
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
              >
                {renderSlotText({ column, row })}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
});
