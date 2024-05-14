import React from 'react';
import Knight from './Knight.jsx';
import Elephant from './Elephant.jsx';

const Piece = ({ isKnight, isElephant }) => {
  return (
    <>
      {isKnight ? <Knight /> : null}
      {isElephant ? <Elephant /> : null}
    </>
  );
};

export default Piece;
