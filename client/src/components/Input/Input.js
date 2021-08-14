import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './Input.css'


const Input = ( { message, setMessage, sendMessage, }) => {

    // Вызываем функцию sendMessage из Chat.js при отправке сообщения.
    const handleSubmit = (event) =>{
        if (event.key === 'Enter'){
            sendMessage(event)
        }
    }

    return (
        <div className="message-form-container">
            <form className="message-form">
                <input 
                    className="message-input" 
                    type="text" 
                    placeholder="Message"
                    value={message} 
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={handleSubmit}
                />
                <button className="send-button" onClick={event => sendMessage(event)}><FontAwesomeIcon icon={faPaperPlane} size="sm" /></button>
            </form>
        </div>
    )
}

export default Input