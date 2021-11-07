export interface DragItem {
    type: string
    id: string
    top: number
    left: number
}
export interface StickyNoteObject {
    top: number;
    left: number;
    title?: string;
    content?: string;
    color?: string;
}
export interface StickyNoteItem {
    [id: string]: StickyNoteObject;
}
