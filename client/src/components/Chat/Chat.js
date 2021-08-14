import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import queryString from 'query-string'
import io from "socket.io-client";

import './Chat.css'

import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import RoomUsers from '../RoomUsers/RoomUsers'
import Sidebar from './Sidebar/Sidebar'

let socket;
let newName;

const ENDPOINT = 'localhost:5000';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const history = useHistory();

    useEffect(() => {
        
        // Получаем название комнаты из ссылки
        const room = queryString.parse(location.search).room

        // Если есть имя (пользователь обычно залогинился впервый раз) то получаем имя из Login.js и устанавливаем newName.
        if (location.hasOwnProperty('name')){
            newName = location.name
        } 

        // Если нет имени (пользователь перешел по ссылке на комнату),
        // перенаправить на страницу Login для ввода имени пользователя и передать название комнаты из ссылки которую он вставил.
        else{  
            history.push({
                pathname: '/',
                room: room
            })
        }

        const name = newName

        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)
        
        socket.emit('join', { name, room }, (error) => {
            // Если пользователь с таким же именем существует в комнате, перенаправить обратно на страницу ввода имени и показать ошибку.
            if(error) {
                if (error === 'Username is taken.'){
                    history.push("/");
                }
                alert(error);
            }
        });

        return () => {
            socket.disconnect()

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        // Добавляем новое сообщение в массив сообщений.
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        // Обновляем информацию о комнате.
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);

    // Вызываем функцию отправления сообщения через сокет.
    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="chat-outer-container">
            <div className="chat-inner-container">
                <Sidebar room={room} users={users} currentUser={name}/>
                <div className="chat-info pc">
                    <Infobar room={room} />
                    <RoomUsers users={users} currentUser={name}/>
                </div>
                <div className="chat-main">
                    <Messages messages={messages} name={name}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Chat