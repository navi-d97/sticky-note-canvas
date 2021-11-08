import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Container } from './Components/Container';
import ToolPanel from './Components/ToolPanel';
import { StickyNoteObject } from './interfaces';
import socketConnection from './socket';
import { allNotesCleared, getNotes, noteCreated, noteDeleted, noteUpdated, updateUser } from './store/actions/stickyNotesAction';


function Canvas() {
  const dispatch = useDispatch()
  const userId = useSelector((state: any) => state.notesData?.userId)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userIdParam = urlSearchParams.get('userId')
    if (userIdParam) {
      dispatch(updateUser(userIdParam));
    } else {
      const newUserId = uuidv4();
      urlSearchParams.set('userId', newUserId);
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, '', "?" + urlSearchParams.toString());
      dispatch(updateUser(newUserId));
    }
  }, [dispatch])

  useEffect(() => {
    if (userId) {

      dispatch(getNotes())

      socketConnection.subscribe(userId);
      socketConnection.onEvent('onNoteCreated', (values: StickyNoteObject,) => {
        dispatch(noteCreated(values))
      });
      socketConnection.onEvent('onNoteDeleted', (id: string,) => {
        dispatch(noteDeleted(id))
      });
      socketConnection.onEvent('onNoteUpdated', (values: any,) => {
        const { id, data } = values;
        dispatch(noteUpdated(id, data))
      });
      socketConnection.onEvent('allNotesCleared', (values: any,) => {
        dispatch(allNotesCleared())
      });
      return (() => socketConnection.unsubscribe(userId))
    }
  }, [dispatch, userId]);

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
