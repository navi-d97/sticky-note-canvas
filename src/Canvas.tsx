import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch } from 'react-redux';
import './App.css';
import { Container } from './Components/Container';
import { addNote } from './store/actions/stickyNotesAction';


function Canvas() {
  const dispatch = useDispatch()
  const onAddItem = useCallback(() => {
    dispatch(addNote({top: 100, left:400}))
  }, [dispatch])
  return (
    <div className="App">
      <button onClick={onAddItem }>
        Add new
      </button>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Container />
        </div>
      </DndProvider>
    </div>
  );
}

export default Canvas;
