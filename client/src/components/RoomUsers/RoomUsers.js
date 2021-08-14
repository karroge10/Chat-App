import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './RoomUsers.css';

// Ототбражаем информацию о пользователях. Активного пользователя выделяем другим цветом.
const RoomUsers = ({ users, currentUser }) => (
  <div className="room-users">
    {
      users
        ? (
          <div className="users-container">
            <div className="users">
              <h1 className="users-header">Online: {users.length}</h1>
              <div className="active-container">
                  {users.map(({name}) => 
                    name === currentUser ? (
                    <div key={name} className="active-item">
                      <FontAwesomeIcon icon={faUserCircle} color="#ff5735" size="lg"/> <p className="users-name active-user">{name}</p>
                    </div>
                    )
                    : (
                      <div key={name} className="active-item">
                        <FontAwesomeIcon icon={faUserCircle} color="#ffffff" size="lg"/> <p className="users-name">{name}</p>
                      </div>
                    ))}
              </div>
              
            </div>
            <a href="/" className="leave-room-button-container">
              <button type="submit" className="login-button red" >Leave <FontAwesomeIcon icon={faSignOutAlt} size="sm" /></button>
            </a>
          </div>
        )
        : null
    }
  </div>
);    

export default RoomUsers;