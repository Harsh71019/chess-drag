import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import Square from './Square.jsx';
import { Overlay, OverlayType } from './Overlay.jsx';

const BoardSquare = ({ x, y, children, game }) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.KNIGHT, ItemTypes.ELEPHANT],
      canDrop: (item, monitor) => {
        if (monitor.getItemType() === ItemTypes.KNIGHT) {
          return game.canMoveKnight(x, y);
        } else if (monitor.getItemType() === ItemTypes.ELEPHANT) {
          console.log('ELEPHANT');
          return game.canMoveElephant(x, y);
        }
        return false;
      },
      drop: (item, monitor) => {
        if (monitor.getItemType() === ItemTypes.KNIGHT) {
          game.moveKnight(x, y);
        } else if (monitor.getItemType() === ItemTypes.ELEPHANT) {
          game.moveElephant(x, y);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game, x, y]
  );
  const black = (x + y) % 2 === 1;

  return (
    <div
      ref={drop}
      role='Space'
      data-testid={`(${x},${y})`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};

export default BoardSquare;
