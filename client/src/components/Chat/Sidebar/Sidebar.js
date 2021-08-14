import React from 'react'
import { slide as Menu } from 'react-burger-menu'

import Infobar from '../../Infobar/Infobar'
import RoomUsers from '../../RoomUsers/RoomUsers'

import './Sidebar.css'


const Sidebar = ({ room, users, name}) => (
    <Menu className="mobile-sidebar">
        <Infobar room={room} />
        <RoomUsers users={users} currentUser={name}/>
    </Menu>
)

export default Sidebar