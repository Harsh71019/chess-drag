import React from 'react';
import Box from './Box';
import Dustbin from './Dustbin';
import { memo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Frame, { FrameContextConsumer } from 'react-frame-component';

const FrameBindingContext = ({ children }) => (
  <FrameContextConsumer>
    {({ window }) => (
      <DndProvider backend={HTML5Backend} context={window}>
        {children}
      </DndProvider>
    )}
  </FrameContextConsumer>
);

const Container = memo(() => {
  return (
    <Frame style={{ width: '100%', height: 400 }}>
      <FrameBindingContext>
        <div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin />
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Box name='Harsh' />
            <Box name='Banana' />
            <Box name='Paper' />
          </div>
        </div>
      </FrameBindingContext>
    </Frame>
  );
});

export default Container;
