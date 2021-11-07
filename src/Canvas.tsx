import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch } from 'react-redux';
import './App.css';
import { Container } from './Components/Container';
import ToolPanel from './Components/ToolPanel';
import { addNote } from './store/actions/stickyNotesAction';


function Canvas() {

  return (
    <div className="App">
      <ToolPanel />
      <DndProvider backend={HTML5Backend}>
        <div>
          <Container />
        </div>
      </DndProvider>
    </div>
  );
}

export default Canvas;
