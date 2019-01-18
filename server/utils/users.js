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
    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    } 
    removeUser (id) {
        // return user that was removed
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    } 
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList (room) {
      let users = this.users.filter((user) => user.room === room);
      let namesArray = users.map((user) => user.name);

      return namesArray;
    }

    getAdminId(room) {
        let users = this.users.filter((user) => user.room === room);
        return users[0].id; 
    }

    addRoom (room) {
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