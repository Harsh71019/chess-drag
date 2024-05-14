import Container from './components/SimpleDrag/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Game } from './components/ChessBoard/Game';
import Board from './components/ChessBoard/Board';
import { useMemo } from 'react';

const containerStyle = {
  width: 500,
  height: 500,
  border: '1px solid gray',
};

function App() {
  const game = useMemo(() => new Game(), []);

  return (
    <>
      <h1>Simple Drag</h1>
      <DndProvider backend={HTML5Backend}>
        <div style={containerStyle}>
          <Board game={game} />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
