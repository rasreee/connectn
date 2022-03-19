import { GameInfo } from './gameInfo';
import { GameState } from './gameState';
import { logger } from './logger';
import { Piece } from './piece';

const getLongestLine = (pieces: Piece[]): Piece[] => {
  return pieces;
};

const isWinningPieces = ({
  pieces,
  info,
}: {
  pieces: Piece[];
  info: GameInfo;
}): boolean => {
  const longestLine = getLongestLine(pieces);

  return longestLine.length === info.winNumber;
};

export enum OutcomeType {
  Draw = 'Draw',
  Winner = 'Winner',
}

export interface GameOutcome {
  type: OutcomeType;
  winner?: number;
}

export const computeOutcome = ({
  info,
  state,
}: {
  info: GameInfo;
  state: GameState;
}): GameOutcome | null => {
  let outcome: GameOutcome | null = null;

  const playerOnePieces = state.pieces.filter(
    (piece) => piece.playerName === info.playerOneName
  );

  const playerTwoPieces = state.pieces.filter(
    (piece) => piece.playerName === info.playerTwoName
  );

  if (
    playerOnePieces.length + playerTwoPieces.length ===
    info.columnCount * info.rowCount
  ) {
    outcome = { type: OutcomeType.Draw };
  }

  if (isWinningPieces({ pieces: playerOnePieces, info })) {
    outcome = { type: OutcomeType.Winner, winner: 0 };
  }

  if (isWinningPieces({ pieces: playerTwoPieces, info })) {
    outcome = { type: OutcomeType.Winner, winner: 1 };
  }

  logger.info(
    'computed outcome for:\n\n',
    { info, state },
    '\n\ngot ',
    outcome
  );

  return outcome;
};
