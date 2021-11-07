import React, { ReactNode, useState } from 'react';
import './popup.css';

type PopupProps = {
    children?: ReactNode;
    popupItem?: ReactNode;
}

export default function Popup({ children, popupItem }: PopupProps) {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <div className="popup" onClick={() => { setVisible((oldState) => !oldState) }}>
                {children}
            </div>
            {
                visible &&
                <span className="popuptext" id="myPopup">
                    {popupItem}
                </span>
            }
        </div>
    )
}
