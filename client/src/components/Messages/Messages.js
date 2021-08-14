import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from '../Message/Message'

import './Messages.css'

// Отображаем массив сообщений.
const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, index) => {
            return(
                <div key={index}>
                    <Message message={message} name={name}/>
                </div>)
        })}
    </ScrollToBottom>
)

export default Messages