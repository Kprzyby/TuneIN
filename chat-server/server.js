const express = require('express')
const app = express()
const https = require('https')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { v4: uuidV4} = require('uuid')
const ExpressPeerServer = require('peer').ExpressPeerServer
const fs = require('fs')

app.use(cors())

var sslOptions = {
    key: fs.readFileSync('./chat+2-key.pem'),
    cert: fs.readFileSync('./chat+2.pem')
  };

const server = https.createServer(sslOptions, app)
const io = new Server(server, {
    cors: 'http://localhost:3000'
})

io.on('connection', (socket) => {
    console.log('User Connected', socket.id);

    socket.on('join', (room, userId) => {
        socket.join(room)
        console.log(`User with ID: ${userId} joined room: ${room}`)
        socket.to(room).emit('user-connected', userId)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id)
    })
})



server.listen(3001, () => {
    console.log('Server running...')
});