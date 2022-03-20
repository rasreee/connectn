import { useEffect, useState } from 'react';

import { useGame } from './useGame';

export interface BoardPieceProps {
  color: string;
  column: number;
  row: number;
}

// TODO(3): style the game board
// - since pieces are dropped from the top, how can we animate that?
// - how would gravity affect a still-dropped piece?
// - how does the distance dropped affect the time it takes to land?
// - there is some boiler plate here to help, but feel free to go with a different approach if you are more comfortable
export function BoardPiece(props: BoardPieceProps) {
  const { color, column, row } = props;
  const { info: gameInfo } = useGame();

  const [isDropped, setIsDropped] = useState(false);

  const baseStyle = {
    color,
    top: 0,
    left: `${(column / gameInfo.dimensions.cols) * 100}%`,
    height: `${(1 / gameInfo.dimensions.cols) * 100}%`,
    width: `${(1 / gameInfo.dimensions.cols) * 100}%`,
  };

  const droppedStyle = {
    ...baseStyle,
    top: `${100 - ((row + 1) / gameInfo.dimensions.cols) * 100}%`,
  };

  // change the style chosen after it initially renders
  useEffect(() => {
    if (!isDropped) {
      setIsDropped(true);
    }
  }, [isDropped]);

  return (
    <div className='Board-Piece' style={isDropped ? droppedStyle : baseStyle} />
  );
}
