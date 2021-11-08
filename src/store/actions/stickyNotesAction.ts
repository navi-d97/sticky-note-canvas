import {GET_NOTES, UPDATE_NOTE, DELETE_NOTE, ADD_NOTE, GET_NOTES_ERROR, CLEAR_ALL, UPDATE_USER} from '../types'
import axios from 'axios';
import { StickyNoteObject } from '../../interfaces';
import { socket } from '../../Common/constants';
import store from '../store';

export const getNotes = () => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const { userId } = store.getState().notesData;
    try{
        const res:any = await axios.get(`http://localhost:8000/stickyNotes?userId=${userId}`);
        dispatch( {
            type: GET_NOTES,
            payload: res.data,
        })
    }
    catch(error){
        dispatch( {
            type: GET_NOTES_ERROR,
            payload: error,
        })
    }

}

export const addNote = (newData:StickyNoteObject) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const { userId } = store.getState().notesData;
    const id = new Date().valueOf();
    socket.emit('createNote',userId,{id, ...newData})
    dispatch( {
        type: ADD_NOTE,
        payload: {id, newData}
    })
}

export const updateNote = (id:string, data:any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const { userId } = store.getState().notesData;
    socket.emit('updateNote',userId,id,data);
    dispatch( {
        type: UPDATE_NOTE,
        payload: {id, data}
    })
}

export const deleteNote = (id:string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const { userId } = store.getState().notesData;
    socket.emit('deleteNote',userId,id);
    dispatch( {
        type: DELETE_NOTE,
        payload: id
    })
}

export const clearAll = () => async (dispatch: (arg0: { type: string; }) => void) => {
    const { userId } = store.getState().notesData;
    socket.emit('clearAll',userId);
    dispatch( {
        type: CLEAR_ALL,
    })
}

export const noteCreated = (newData:StickyNoteObject) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch( {
        type: ADD_NOTE,
        payload: newData
    })
}

export const noteDeleted = (id:string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch( {
        type: DELETE_NOTE,
        payload: id
    })
}

export const noteUpdated = (id:string, data:any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch( {
        type: UPDATE_NOTE,
        payload: {id, data}
    })
}

export const allNotesCleared = () => async (dispatch: (arg0: { type: string; }) => void) => {
    dispatch( {
        type: CLEAR_ALL,
    })
}

export const updateUser = (userId: string) => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch( {
        type: UPDATE_USER,
        payload: userId,
    })
}
