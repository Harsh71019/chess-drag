import { useEffect, useState } from 'react';
import BoardSquare from './BoardSquare.jsx';
import Piece from './Piece.jsx';
/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
};
/** Styling properties applied to each square element */
const squareStyle = { width: '12.5%', height: '12.5%' };
/**
 * The chessboard component
 * @param props The react props
 */
const Board = ({ game }) => {
  const [knightPosition, setKnightPosition] = useState(game.knightPosition);
  const [elephantPosition, setElephantPosition] = useState(
    game.elephantPosition
  );

  useEffect(() => {
    const knightUnsubscribe = game.observe((pos) =>
      setKnightPosition(pos.knightPosition)
    );
    const elephantUnsubscribe = game.observe((pos) =>
      setElephantPosition(pos.elephantPosition)
    );

    return () => {
      knightUnsubscribe();
      elephantUnsubscribe();
    };
  }, [game]);

  function renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y} game={game}>
          <Piece
            isKnight={x === knightPosition[0] && y === knightPosition[1]}
          />
          <Piece
            isElephant={x === elephantPosition[0] && y === elephantPosition[1]}
          />
        </BoardSquare>
      </div>
    );
  }
  const squares = [];
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};

export default Board;
