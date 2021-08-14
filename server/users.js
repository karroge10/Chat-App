const users = []

const addUser = ({ id, name, room}) => {

    // Проверяем существует ли уже такой пользователь в комнате.
    const userExists = users.find(user => user.room === room && user.name === name)
    if (userExists) return { error: 'Username is taken.' }

    // Добавляем пользователя в список пользователей комнаты.
    const user = { id, name, room }
    users.push(user)
    return { user }
}

// Удаляем пользователя из списка по id.
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Получаем пользователя по id 
const getUser = (id) => users.find((user) => user.id === id);

// Получаем всех пользователей в комнате
const getUsersInRoom = (room) => users.filter(user => user.room === room)

module.exports = { 
    addUser, 
    removeUser, 
    getUser, 
    getUsersInRoom }