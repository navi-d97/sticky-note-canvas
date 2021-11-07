import { FC, useCallback, useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { StickyNote } from './StickyNote'
import update from 'immutability-helper'
import { DragItem, StickyNoteItem } from '../interfaces'


export const Container: FC = () => {
  const [boxes, setBoxes] = useState<StickyNoteItem>({
    'a': { top: 20, left: 80, content: 'Drag me around' },
    'b': { top: 198, left: 245, content: 'Drag me too', color: 'yellow' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
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
      {Object.keys(boxes).map((key) => {
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
