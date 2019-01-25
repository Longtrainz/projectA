let sock = io();

class Game {
    constructor(users, sockets) {
        this._users = users;
        this._sockets = sockets;
        console.log('Users in room: ' + this._users.length)
        console.log('Sockets in room: ' + this._sockets.length)
        // this.users = new Users();
        // this.users = users;
        // this._players = users.getUserList(players.room);
        
        // let usersInRoom = users.getUserList(user.room);  -- works
        // let usersInRoom = users.getUserObjects(user.room);

        this._sockets.forEach(socket => {
        // user.socket.emit('newMessage', generateMessage(user.name, "Ho-ho-ho!!!")); //-- works

            socket.emit('print', 'howdoyoudofellowkids');
            socket.emit('test', 'hi hi hi');
            // console.log('Socket: ' + user.socket);
            // console.log('User name: ' + user.id + ' ' + user.name);
        });
    }
}
