const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { v4: uuidV4} = require('uuid')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: 'http://localhost:3000'
})

io.on('connection', (socket) => {
    console.log('User Connected', socket.id);

    socket.on('join', (room) => {
        socket.join('room')
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id)
    })
})

server.listen(3001, () => {
    console.log('Server running...')
});