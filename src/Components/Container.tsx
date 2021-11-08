import { FC, useCallback, useEffect, useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { StickyNote } from './StickyNote'
import { DragItem, StickyNoteItem } from '../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { updateNote } from '../store/actions/stickyNotesAction'


export const Container: FC = () => {

  const dispatch = useDispatch()
  const notesData = useSelector((state: any) => state.notesData)
  const {notes } = notesData;

  useEffect(()=>{
   setBoxes(notes); 
  },[notes]);

  const [boxes, setBoxes] = useState<StickyNoteItem>();

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      dispatch(updateNote(id, {left, top}))
    },
    [dispatch],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  return (
    <div ref={drop} className="drag-drop-container">
      {boxes && Object.keys(boxes).map((key) => {
        return (
          <StickyNote
            key={key}
            id={key}
            item={boxes[key]}
          />
        )
      })}
    </div>
  )
}
