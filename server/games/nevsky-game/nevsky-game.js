// const {Users} = require('./utils/users');
// let {generateMessage, generateLocationMessage} = require('../../utils/message');
const {getRanks} = require('./titles');
let socket;

class NevskyGame {
    constructor(users, sockets) {
        this._users = users;
        this._sockets = sockets;
        this._titles = getRanks();

        console.log('Users in room: ' + this._users.length)
        console.log('Sockets in room: ' + this._sockets.length)
    
        // Start game
        let introMessage = `2653 год.` + '<br>' +
        `Вот уже 300 лет как Александр "ВотТакВот" Невский 
        стал Императором планеты Земля.`+ '<br>' + 
        `За верную и отважную службу в войне против Армии Обзорщика и подавлении многочисленных восстаний, 
        Бессмертный Владыка милостиво жалует храбрым воинам по 3 Титула.` + '<br>' +
        `Отныне простолюдины обязаны перечислять Ваши звания перед обращением к Вам. ` + '<br>' +
        `Каждый из Титулов наделяет Вас властью и особыми привилегиями.`

        // Start message
        socket = this._sockets[0];
        socket.emit('startNewGame', {text: introMessage});  

        this._startGame(this._users);
        
    }
    _removeTitle(title) {
        let index = this._titles.indexOf(title);
        if (index > -1) {
            this._titles.splice(index, 1);
        }
    }
    _startGame(users) {
        let titles = [];
        users.forEach((user) => {
            titles = this._getRandomTitle();
            socket.emit('nevskyTitlesGame', {text:`Почетными Титулами награждается ${user.name}:` + '<br>'});
            socket.emit('nevskyTitlesGame', {text:`Отныне Вы: ${titles[0]}, ${titles[1]}, ${titles[2]}` + '<br>'});
            console.log(`Почетными Титулами награждается ${user.name}:`)
            console.log(`Отныне Вы: ${titles[0]}, ${titles[1]}, ${titles[2]}`);
        });
    }
    _getRandomTitle() {
        let titles = [];
        for (let i = 0; i <= 2; i++) {
            let title = this._titles[Math.floor(Math.random()*this._titles.length)];
            titles.push(title);
            this._removeTitle(title);
        }
        return titles;
    }
}


module.exports = NevskyGame;






       



// let socket = io();
// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');
// let app = express();
// let server = http.createServer(app);
// let io = socketIO(server); // we get web sockets server into 'io' variable
// const {generateMessage, generateLocationMessage} = require('./utils/message');
// const sock = io();



// class NevskyGame {
//     constructor(user, users) {
//         // this.users = new Users();
//         // this.users = users;
//         // this._players = users.getUserList(players.room);
        
//         // let usersInRoom = users.getUserList(user.room);  -- works
//         let usersInRoom = users.getUserObjects(user.room);

//         usersInRoom.forEach(user => {
//         // user.socket.emit('newMessage', generateMessage(user.name, "Ho-ho-ho!!!")); //-- works
//             let socket = user.socket;

//             socket.emit('tesstServersss', 'howdoyoudofellowkids');

//             // user.socket.emit('11', {
//             //     playerID:12,
//             //     otherVariable:1
//             //  }); 

//             user.socket.emit('test', 'hi hi hi');
//             console.log('Socket: ' + user.socket);
//             console.log('User name: ' + user.id + ' ' + user.name);
//         });


//         // let usersInTheRoom = users.getUsersByAdminId(user.id);

//             // for(let i = 0; i < usersInTheRoom.length; i++) {
//             //     console.log(`User ${i} is: ${usersIntheRoom[i].name}`);
//             // }

//         // this._turns = [null, null];

//     // this._players.forEach((player) => {
//     //         console.log('Player: ' + player);
//     //     });

//         // this._sendToPlayers('Rock Paper Scissors Starts!');

//         // this._players.forEach((player, playerIndex) => {
//         //     player.on('turn', (turn) => {
//         //         this._onTurn(playerIndex, turn);
//         //     });
//         // });
//     }
// }
