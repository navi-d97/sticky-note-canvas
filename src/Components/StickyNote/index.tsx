import { FC, useCallback } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { TwitterPicker } from 'react-color';
import { StickyNoteObject } from '../../interfaces'
import { ItemTypes } from '../../ItemTypes'
import { deleteNote, updateNote } from '../../store/actions/stickyNotesAction';
import './stickyNote.css';
import colorIcon from '../../assets/color-palette.svg';
import Popup from '../Popup';
import { stickyNoteBgColors } from '../../Common/constants';
export interface StickyNoteProps {
  id: any
  item: StickyNoteObject,
}

export const StickyNote: FC<StickyNoteProps> = ({
  id,
  item: { left, top, content, title, color }
}) => {
  const dispatch = useDispatch()
  const updateContent = useCallback(
    (id: string, content: string) => {
      dispatch(updateNote(id, { content }))
    },
    [dispatch],
  )

  const updateTitle = useCallback(
    (id: string, title: string) => {
      dispatch(updateNote(id, { title }))
    },
    [dispatch],
  )

  const changeBgColor = useCallback((id,color)=>{
    dispatch(updateNote(id, {color}))
  },[dispatch])

  const deleteItem = useCallback(
    (id: string) => {
      dispatch(deleteNote(id))
    },
    [dispatch],
  )

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div
      ref={drag}
      style={{ left, top, backgroundColor: color }}
      className="sticky-note"
    >
      <textarea
        placeholder="Enter title"
        className="sticky-note-text-area sticky-note-title"
        onChange={(e) => { updateTitle(id, e.target.value) }}
        value={title}
        spellCheck={false}
      />
      <div className="color-btn">
        <Popup popupItem={<TwitterPicker colors={stickyNoteBgColors} onChangeComplete={(color)=>changeBgColor(id,color.hex)} />}>
          <img src={colorIcon} alt='...' />
        </Popup>
      </div>
      <button onClick={() => { deleteItem(id) }} className="close-btn">
        X
      </button>
      <textarea
        className="sticky-note-text-area sticky-note-cnt"
        placeholder="Enter note description"
        value={content}
        onChange={(e) => { updateContent(id, e.target.value) }}
        spellCheck={false}
      />
    </div>
  )
}
