const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const NevskyGame = require('./nevsky-game');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // we get web sockets server into 'io' variable
let users = new Users();
// let rooms = [];
let room;
let admin;

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString (params.room)) {
            return callback('Name and room name are required');
        }
        let usersList = users.getUserList(room);
        let username = params.name.toLowerCase().trim();
        room = params.room.toLowerCase().trim();

        usersList.forEach(user => {
          if (user.toLowerCase() === username) {
              return callback('Name is already in use');
          }
      });

        socket.join(room);
        // rooms.push(room);
        users.addRoom(room);
        
        // remove from other rooms
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room);

        // Update User list
        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();

        // If user is first in the room, then he becomes admin and button is disabled for him
        if (users.getUserList(room).length === 1) {
            // admin = socket;
            admin = users.getAdminId(room);
            console.log(admin);
            socket.emit('showDisabledStartGameButton');
        } 

        // If room is full, get admin of the room (first player socket id) and enable button
        if (users.getUserList(room).length === 2) {
            admin = users.getAdminId(room);
            console.log(admin);
            socket.to(admin).emit('showStartGameButton');
        }
    });

    socket.on('startGame', () => {
       new NevskyGame(users.getUserList(room));
    });

    socket.on('listServers', function(servers) {
        // let createdRooms = rooms;
        // let createdRooms = users.getRoomsList();
        let createdRooms = users.getUserCountInRooms();
        socket.emit('servers', createdRooms);
    });


    socket.on('createMessage', function(message, callback) {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        } 
    });
    

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        console.log('User was disconnected');

        // Get clients count in specific room
        console.log(`${room} is ${users.getUserList(room).length}`);
    
        if (users.getUserList(room).length < 1) {    
        // Remove room from the rooms array if it is empty
        let rooms = users.getRoomsList();
        let index = rooms.indexOf(room);
        if (index > -1) {
            rooms.splice(index, 1);
        }
        // Update rooms list on index page
        socket.on('listServers', function(servers) {
        // let createdRooms = rooms;
        // let createdRooms = users.getRoomsList();
        let createdRooms = users.getUserCountInRooms();
        socket.emit('servers', createdRooms);
    });
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});




//socket.leave('The Office Fans');

// io.emit - emits event to everyone | io.emit -> io.to('The Office Fans').emit
// socket.broadcast.emit - to everyone except the current user | socket.broadcast.to('The Office Fans').emit
// socket.emit - emits event to one user


// // Show message to all except sender - broadcast.emit
// socket.broadcast.emit('newMessage', {
//     from: message.from,
//     text: message.text,
//     createdAt: new Date().getTime()
// });

// Inside io.on('connection')
//   // From server to client
//   socket.emit('newEmail', {
//     from: 'mike@example.com',
//     text: 'Hey! Wazzzuuup!',
//     createdAt: 123
// });




// // custom event listener, from client to server
// socket.on('createEmail', (newEmail) => {
//     console.log('createEmal', newEmail);
// });


// 'on' - lets u register event listener, we can listen for specific event and do smth when event happens
// 'connection' - event that listens for new connection - client connected to the server

 // socket.emit - emits event to single connection, io.emit - to every single connection