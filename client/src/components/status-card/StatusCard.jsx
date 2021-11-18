import React from 'react'
import './statuscard.css'


const StatusCard = props => {
    return (
        <div className='status-card'>
            <span className='status-card-bg'></span>
            <div className="status-card__icon">
                <i className={props.icon}></i>
            </div>
            <div className="status-card__info">
                <i className={props.icon}></i>
                <h4>{props.count}</h4>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

export default StatusCard
