import {GET_NOTES, UPDATE_NOTE, DELETE_NOTE, ADD_NOTE, GET_NOTES_ERROR, CLEAR_ALL} from '../types'
import axios from 'axios'
import { StickyNoteObject } from '../../interfaces';

export const getNotes = () => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    
    try{
        // const res:any = await axios.get('');
        dispatch( {
            type: GET_NOTES,
            payload: {},//res.data.page['content-items'].content
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
    dispatch( {
        type: ADD_NOTE,
        payload: newData
    })
}

export const updateNote = (id:string, data:any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch( {
        type: UPDATE_NOTE,
        payload: {id, data}
    })
}

export const deleteNote = (id:string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch( {
        type: DELETE_NOTE,
        payload: id
    })
}

export const clearAll = () => async (dispatch: (arg0: { type: string; }) => void) => {
    dispatch( {
        type: CLEAR_ALL,
    })
}