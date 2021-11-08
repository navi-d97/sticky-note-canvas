import React, {useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch } from 'react-redux';
import './App.css';
import { mockUserId } from './Common/constants';
import { Container } from './Components/Container';
import ToolPanel from './Components/ToolPanel';
import { StickyNoteObject } from './interfaces';
import socketConnection from './socket';
import { allNotesCleared, noteCreated, noteDeleted, noteUpdated } from './store/actions/stickyNotesAction';


function Canvas() {
  const dispatch = useDispatch()
  useEffect(()=>{
    socketConnection.subscribe(mockUserId);
    socketConnection.onEvent('onNoteCreated', (values:StickyNoteObject, )=>{
      dispatch(noteCreated(values))
    });
    socketConnection.onEvent('onNoteDeleted', (id:string, )=>{
      dispatch(noteDeleted(id))
    });
    socketConnection.onEvent('onNoteUpdated', (values:any, )=>{
      const {id, data} = values;
      dispatch(noteUpdated(id, data))
    });
    socketConnection.onEvent('allNotesCleared', (values:any, )=>{
      dispatch(allNotesCleared())
    });
    return( () => socketConnection.unsubscribe(mockUserId))
  },[dispatch]);
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
