[{
    id: '/#131posfjdg',
    name: 'Andrew',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
     this.users = []; 
     this.rooms = [];  
    }

    addUser(socket, id, name, room) {
        let user = {socket, id, name, room};
        this.users.push(user);
        return user;
    } 

    removeUser(id) {
        // return user that was removed
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    } 

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
      let users = this.users.filter((user) => user.room === room);
      let namesArray = users.map((user) => user.name);
      return namesArray;
    }

    getUserObjects(room) {
        let users = this.users.filter((user) => user.room === room);
        return users;
      }

    getAdminId(room) {
        let users = this.users.filter((user) => user.room === room);
        return users[0].id; 
    }

    getUsersByAdminId(adminId) {
        // console.log('Admin Id: ' + adminId);
        // console.log('User names: ' )
        // console.log(this.users);

        let rooms = this.getRoomsList();
        let user = this.getUser(adminId);
        console.log('Admin: ' + user.name + ' Id: '+ user.id + ' Room: ' + user.room)
        let room = rooms.filter((room) => room === user.room);
        let result = this.getUserList(room);
        return result;
        // return this.getUserObjects(room)
    
        // console.log('Get user id: ' + u);
       
    //    let rooms = this.getRoomsList();
    //    let user = this.getUser(adminId);
    //    console.log('Admin: ' + user.name + ' Id: '+ user.id + ' Room: ' + user.room)
    //    let room = rooms.filter((room) => room === user.room);
    //    return this.getUserObjects(room);

    }

    addRoom(room) {
        this.rooms.push(room);
        return room;
    }

    getRoomsList() {
        let unique = [...new Set(this.rooms)];
        let uniqueRooms = Array.from(unique);
        return uniqueRooms;
    }

    getUserCountInRooms() {
        let usersInRooms = [];
        let uniqueRooms = this.getRoomsList();

        uniqueRooms.forEach((room) => {
            let chat = {
                name: room,
                users: this.getUserList(room)
            }
            usersInRooms.push(chat);
        });
        return usersInRooms;
    }
}

module.exports = {Users};














// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// let me = new Person('Andy', 25);
// let description = me.getUserDescription();
// console.log(description);