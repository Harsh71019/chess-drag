import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import { elephantImage } from './elephantImage.js';

const elephantStyle = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
};

const Elephant = () => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.ELEPHANT,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={elephantImage} />
      <div
        ref={drag}
        style={{
          ...elephantStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        𓃰
      </div>
    </>
  );
};

export default Elephant;
