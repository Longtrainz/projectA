let socket = io();

socket.on('connect', function () {
    console.log('Test');
});

let servers = new Set();
socket.emit('listServers', servers);

socket.on('servers', function(rooms) {
    // let unique = [...new Set(rooms)]; 
    // socket.on('usersCount', function(users) {
    //     console.log(`${unique} : ${users}`);
    // });
    
    // console.log('Rooms', rooms);
    rooms.forEach(room => {
        console.log(`Room: ${room.name}; Users: ${room.users.length}`);
    });
});


socket.on('disconnect', function() {
    console.log('Disconnected from main page');
    // window.history.back();
    // history.pushState(null, "", location.href.split("?")[0]);
});




