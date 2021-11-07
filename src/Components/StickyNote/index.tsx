import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { StickyNoteObject } from '../../interfaces'
import { ItemTypes } from '../../ItemTypes'
import './stickyNote.css';

export interface StickyNoteProps {
  id: any
  item: StickyNoteObject,
}

export const StickyNote: FC<StickyNoteProps> = ({
  id,
  item: {left, top, content, color}
}) => {
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
      style={{ left, top, backgroundColor: color || '#fff' }}
      className="sticky-note"
    >
      {content}
    </div>
  )
}
