import React, { useEffect } from 'react';
import './Board.css';
import { BoardPiece } from './BoardPiece';
import { BoardInfo } from './BoardInfo';
import { Piece, GameInfo, GameState, getGameOutcome } from 'lib/game';

const getPieceColor = (piece: Piece, gameInfo: GameInfo) => {
  const isPlayerOne = piece.playerName === gameInfo.playerOneName;

  return isPlayerOne ? 'red' : 'green';
};

interface BoardProps {
  gameInfo: GameInfo;
  gameState: GameState;
  placePiece: (column: number, row: number) => void;
}

export const Board = ({ gameInfo, gameState, placePiece }: BoardProps) => {
  useEffect(() => {
    const outcome = getGameOutcome({ info: gameInfo, state: gameState });
    if (!outcome) return;

    console.log('OUTCOME: ', outcome);
  }, [gameInfo, gameState]);

  return (
    <>
      <BoardInfo gameInfo={gameInfo} gameState={gameState} />
      <div
        className='Board'
        style={{
          width: gameInfo.columnCount * 50,
          height: gameInfo.rowCount * 50,
        }}
      >
        {/** TODO(2): placing game pieces
         * - how do utilize the provided board piece component to visualize the game state?
         */}
        {gameState.pieces.map((piece, i) => (
          <BoardPiece
            key={i}
            column={piece.column}
            row={piece.row}
            gameInfo={gameInfo}
            color={getPieceColor(piece, gameInfo)}
          />
        ))}
        {Array.from(Array(gameInfo.rowCount), (e, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(gameInfo.columnCount), (e, column) => (
              <div
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                onClick={() => placePiece(column, gameInfo.rowCount - row - 1)}
              >
                {row}, {column}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
