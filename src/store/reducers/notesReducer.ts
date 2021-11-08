import { StickyNoteItem } from '../../interfaces';
import { ADD_NOTE, CLEAR_ALL, DELETE_NOTE, GET_NOTES, GET_NOTES_ERROR, UPDATE_NOTE } from '../types'

const initialState = {
    notes: {},
    loading: true
}

const addNewNote = (allNotes: StickyNoteItem, data: any) => {
    const { id, newData } = data;
    const updatedNotes = { ...allNotes };
    updatedNotes[id] = newData;
    return updatedNotes;
}

const updateNote = (allNotes: StickyNoteItem, newNote: any) => {
    const id = newNote.id;
    const updatedData = newNote.data;
    const updatedNotes = { ...allNotes };
    updatedNotes[id] = { ...updatedNotes[id], ...updatedData };
    return updatedNotes;
}

const deleteNote = (allNotes: StickyNoteItem, id: string) => {
    const updatedNotes = { ...allNotes };
    delete updatedNotes[id];
    return updatedNotes;
}

export default function moviesReducer(state = initialState, action: { type: string; payload: any }) {

    switch (action.type) {

        case GET_NOTES:
            return {
                notes: action.payload,
                loading: false

            }
        case GET_NOTES_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_NOTE:
            return {
                ...state,
                notes: addNewNote(state.notes, action.payload),
            }
        case UPDATE_NOTE:
            return {
                ...state,
                notes: updateNote(state.notes, action.payload),
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: deleteNote(state.notes, action.payload),
            }
        case CLEAR_ALL:
            return {
                ...state,
                notes: {},
            }
        default: return state
    }

}