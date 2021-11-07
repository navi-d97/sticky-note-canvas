import { combineReducers } from 'redux'
import notesReducer from './notesReducer'

export default combineReducers({
  notesData: notesReducer
})