import {GET_NOTES, UPDATE_NOTE, DELETE_NOTE, ADD_NOTE, GET_NOTES_ERROR, CLEAR_ALL} from '../types'
import axios from 'axios';
import { StickyNoteObject } from '../../interfaces';
import { mockUserId, socket } from '../../Common/constants';


export const getNotes = () => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    
    try{
        const res:any = await axios.get(`http://localhost:8000/stickyNotes?userId=${mockUserId}`);
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
    const id = new Date().valueOf();
    socket.emit('createNote',mockUserId,{id, ...newData})
    dispatch( {
        type: ADD_NOTE,
        payload: {id, newData}
    })
}

export const updateNote = (id:string, data:any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    socket.emit('updateNote',mockUserId,id,data);
    dispatch( {
        type: UPDATE_NOTE,
        payload: {id, data}
    })
}

export const deleteNote = (id:string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    socket.emit('deleteNote',mockUserId,id);
    dispatch( {
        type: DELETE_NOTE,
        payload: id
    })
}

export const clearAll = () => async (dispatch: (arg0: { type: string; }) => void) => {
    socket.emit('clearAll',mockUserId);
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
