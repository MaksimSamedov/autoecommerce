import React, {useEffect, useState} from "react";
import {getViewport} from "../../hooks/layout/getViewport";
import '../../styles/layout/Modal.css';

interface ModalProps {
    title: string|false|null,
    children: React.ReactNode,
    onClose: () => void,
}

export function Modal({title, children, onClose}: ModalProps) {
    const viewport = getViewport()

    const [top, setTop] = useState(viewport.top())
    const [bottom, setBottom] = useState(viewport.bottom())

    useEffect(() => {
        const handler = () => {
            setTop(viewport.top())
            setBottom(viewport.bottom())
        }
        viewport.onResize(handler)
        const html = document.getElementsByTagName('html')[0]
        html.style.overflow = 'hidden'

        return () => {
            viewport.removeListener(handler)
            html.style.overflow = ''
        }
    }, [])

    const cls = [
        "modal fixed z-[200] bg-white left-0 right-0 w-100 overflow-hidden mw-[400px]"
    ]

    return (
        <div className="cursor-default">
            <div className="fixed z-[199] top-0 left-0 bottom-0 right-0 bg-black/50" onClick={onClose}></div>
            <div className={cls.join(' ')} style={{top: `${top}px`, bottom: `${bottom}px`}}>
                <div className="modal-wrapper">
                    <div className="modal-header">
                        {title && <div className="text-lg modal-title">{title}</div> }
                        <div className="modal-close" onClick={onClose}>&#x2715;</div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}