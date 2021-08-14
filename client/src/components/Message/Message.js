import React from 'react'

import './Message.css'

const Message = ({ message: { user, time, text }, name }) => {
    let sentByCurrentUser = false;

    if (user === name) {
        sentByCurrentUser = true;
    }
    
    // Определяем кем отправлено сообщение
    if (sentByCurrentUser) {
        return(
            <div className="message-outer-сontainer message-right">
                <div className="message-details">
                    <p className="message-name">{name}</p>
                    <p className="message-time">{time}</p>
                </div>
                <div className="message-inner-container my-message">
                    <p className="message-text">{text}</p>
                </div>
            </div>
        )
    } else {
        return(
            <div className="message-outer-сontainer message-left">
                <div className="message-details">
                    <p className="message-name">{user}</p>
                    <p className="message-time">{time}</p>
                </div>
                <div className="message-inner-container white-message">
                    <p className="message-text">{text}</p>
                </div>
            </div>
        )
    }
}

export default Message