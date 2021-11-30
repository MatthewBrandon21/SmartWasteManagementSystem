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
                    <h1><i className='bx bxs-message-square-add'></i> {props.title}</h1>
                </div>
                <div className="modal-body">
                    {props.content}
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary">
                        submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;