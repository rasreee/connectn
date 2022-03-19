import './Board.css';

import { GameInfo, GameState, getGameOutcome, Piece } from 'lib/game';
import React, { useMemo } from 'react';

import { BoardInfo } from './BoardInfo';
import { BoardPiece } from './BoardPiece';

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
  const gameOutcome = useMemo(() => {
    const outcome = getGameOutcome({ info: gameInfo, state: gameState });

    console.log('OUTCOME: ', outcome);

    return outcome;
  }, [gameInfo, gameState]);

  return (
    <>
      <BoardInfo />
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
              <button
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                disabled={Boolean(gameOutcome)}
                onClick={() => placePiece(column, gameInfo.rowCount - row - 1)}
              >
                {row}, {column}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
