import React, { useEffect } from 'react';
import './modal.css';


const Modal = props => {

    if (!props.show) {
        return null
    }

    return (
        <div className="modal" onClick={props.close}>
            <div className="modal-content" onClick={close => close.stopPropagation()}>
                <div className="modal-header">
                    <button className="modal__close" onClick={props.close}>
                        <i className='bx bx-x'></i>
                    </button>
                    {props.title}
                </div>
                {props.content}
            </div>
        </div>
    )
}

export default Modal;