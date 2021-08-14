import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import './Infobar.css'

// Отображаем название комнаты.
const Infobar = ( { room }) => (
    <div className="info-bar">
        <div>
            <h1 className="room-title"><FontAwesomeIcon icon={faUsers} color="#FF4C29" /> {room}</h1>
        </div>
    </div>
)

export default Infobar