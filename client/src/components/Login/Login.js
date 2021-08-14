import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


import './Login.css'

let newRoom;

const Login = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    // Устанавливаем ссылку с комнатой и передаем имя в Chat.js.
    const newTo = {
        pathname:  "/chat",
        search: `?room=${room}`,
        name: name
    }

    // Если есть информация о комнате, значит пользователь перешел по ссылке. Записываем комнату в newRoom.
    if (location.hasOwnProperty('room')){
        newRoom = location.room
        newTo.search = `?room=${newRoom}`
    }

    // Проверяем введены ли имя пользователя и название комнаты.
    const handleSubmit = (event) =>{
        if (newRoom){
            if (!name || !newRoom){
                event.preventDefault()
                alert('Username and room are required.')
            }
        } else{
            if (!name || !room){
                event.preventDefault()
                alert('Username and room are required.')
            }
        }
    }

    // Если есть newRoom (перешел по ссылке), тогда отображаем логин без ввода названия комнаты, так как она уже выбрана. Пользователь вводит только свое имя.
    if (newRoom){
        return (
            <div className="login-outer-container">
                <div className="login-inner-container">
                    <h1 className="login-header">Join Room "{newRoom}"</h1>
                    <div className="login-input-box">
                        <input className="login-input" placeholder="Name" type="text" onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <Link onClick={handleSubmit} to={newTo} className="login-button-link">
                        <button type="submit" className="login-button red">Join</button>
                    </Link>
                    <a href="/" className="login-button-link">
                        <button type="submit" className="login-button" >Leave <FontAwesomeIcon icon={faSignOutAlt} size="sm" /></button>
                    </a>
                </div>
            </div>
        )
    } 
    // Иначе отображаем стандартный логин с вводом названия комнаты и имени пользователя.
    else{
        return (
            <div className="login-outer-container">
                <div className="login-inner-container">
                    <h1 className="login-header">Join Room</h1>
                    <div className="login-input-box">
                        <input className="login-input" placeholder="Name" type="text" onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="login-input-box">
                        <input className="login-input" placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)}/>
                    </div>
                    <Link onClick={handleSubmit} to={newTo} className="login-button-link">
                        <button type="submit" className="login-button red">Sign in</button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default Login
