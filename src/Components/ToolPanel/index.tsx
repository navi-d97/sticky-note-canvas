import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { addNote, clearAll } from '../../store/actions/stickyNotesAction';
import './toolPanel.css';

export default function ToolPanel() {
    const dispatch = useDispatch()
    const onAddItem = useCallback(() => {
        dispatch(addNote({ top: 100, left: 400 }))
    }, [dispatch])
    const onClearAll = useCallback(() => {
        dispatch(clearAll())
    }, [dispatch])

    return (
        <div className="toolPanel">
            <button className="tool-item" onClick={onAddItem}>
                Add new
            </button>
            <button className="tool-item" onClick={onClearAll}>
                Clear All
            </button>
        </div>
    )
}
