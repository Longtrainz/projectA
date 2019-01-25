let socket = io();

let locationButton = jQuery('#send-location');

function scrollToBottom () {
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    // get search params from URL
    let params = jQuery.deparam(window.location.search);

    // emit params to server with params.name and params.room information
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
    // window.history.back();
    // history.pushState(null, "", location.href.split("?")[0]);
});

socket.on('updateUserList', function (users) {
    let ol = jQuery('<ol></ol>');
    
    // users.forEach(user => {
    //     ol.append(jQuery('<li></li>').text(user));
    // });

    users.forEach(user => {
        let li = jQuery('<li></li>');
        li.append(jQuery('<a href="#"></a>').text(user));
        ol.append(jQuery(li));
    });

    jQuery('#users').html(ol);
});


socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
       text: message.text,
       from: message.from, 
       createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newIntroMessage', function (message) {
    let messages = document.getElementById('messages');
    let span = document.createElement('span');
    span.className = 'intro__message';
    span.innerHTML = message.text
    messages.appendChild(span);
    scrollToBottom();
});

socket.on('startNewGame', (message) => {
    socket.emit('createIntroMessage', message, function () {
        console.log('This is callback')
    });
});


socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime 
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// Create message, listen to submit button
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});


// https://stackoverflow.com/questions/8936652/dynamically-create-buttons-with-jquery
// Create location message, Get location by clicking button
socket.on('showDisabledStartGameButton', () => {
    $(document).ready(function() {
        locationButton = $('<button/>', {
            text: "Waiting for players to join",
            id: 'send-location',
            click: function() {
                socket.emit('startGame'), 
                locationButton.attr('hidden', 'hidden');
            }
            /* click: function () { alert('hi'); } */
        }); 
        locationButton.attr('disabled', 'disabled');
        $(".chat__footer").append(locationButton);
      });
});

// locationButton.on('click', function() {
//     socket.emit('startGame')
// });

socket.on('showStartGameButton', () => {
    locationButton.removeAttr('disabled').text('Start game');
});

// socket.on('hideStartGameButton', () => {
//     locationButton.attr('hidden', 'hidden');
// });

 // locationButton = $('<button/>').text("Waiting for players to join");
    // locationButton.attr('id', 'send-location');
    // locationButton.attr('disabled', 'disabled');
    // $(".chat__footer").append(locationButton);
    // locationButton.attr('disabled', 'disabled').text('Waiting for players to join');

// locationButton.attr('disabled', 'disabled').text('Waiting for players to join');
// locationButton.on('click', () => {
//     if (!navigator.geolocation) {
//         return alert('Geolocation not supported by your browser');
//     }

//     // locationButton.attr('disabled', 'disabled').text('Sending location...');

//     navigator.geolocation.getCurrentPosition(function (position) {
//         locationButton.removeAttr('disabled').text('Send location');
//         socket.emit('createLocationMessage', {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//         });
//     }, function () {
//         locationButton.removeAttr('disabled').text('Send location');
//         alert('Unable to fetch location');
//     });
// });






// let li = document.createElement('li');
// li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
// document.getElementById('messages').appendChild(li);


// document.getElementById('message-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     let inputVaue = document.querySelector('[name=message]').value;

//     socket.emit('createMessage', {
//         from: 'User',
//         text: inputVaue
//     }, () => {
        
//     });
// });








// newMessage (server -> client: from, text, createdAt), createMessage(client -> server: from, text)

    // Inside socket.on('connect')
    // // from client to server
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, buddy!'
    // });


// // custom event listener, from server to client 
// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });