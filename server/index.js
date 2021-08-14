const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
}

const PORT = process.env.PORT || 5000
const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server, corsOptions);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

io.on("connect", (socket) => {

    socket.on('join', ({ name, room }, callback) => {

        // Создаем пользователя и получаем время присоединения.
        const { error, user } = addUser({ id: socket.id, name, room })
        const time = new Date().toLocaleTimeString();

        if (error) return callback(error)

        // Присоединяем пользователя к комнате.
        socket.join(user.room)

        // Отправляем сообщения.
        socket.emit('message', { user: 'Bot', time: time, text: `${user.name}, welcome to the room ${user.room}.`});
        socket.to(user.room).emit('message', { user: 'Bot', time: time, text: `${user.name} has joined the channel.`});

        // Передаем информацию о комнате.
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        
        callback()
    })

    socket.on('sendMessage', (message, callback) => {

        // Получаем информацию о пользователе и время отправки сообщения.
        const user = getUser(socket.id)
        const time = new Date().toLocaleTimeString();

        // Отправляем сообщение и получаем информацию о комнате.
        io.to(user.room).emit('message', { user: user.name, time: time, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })

    socket.on('disconnect', () => {

        // Удаляем пользователя из комнаты, получаем время удаления.
        const user = removeUser(socket.id)
        const time = new Date().toLocaleTimeString();

        // Отправляем сообщение и получаем информацию о комнате.
        if (user){
            io.to(user.room).emit('message', { user: 'Bot', time: time, text: `${user.name} has left the channel.`})
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })
  });



app.use(router)

server.listen(PORT,  () => console.log(`Server started on port ${PORT}`))
