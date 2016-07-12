
var socket = io();
var username = prompt("Pick a Name");

// EVENTS
  // listeners
    // jQuery version: $("body").on("click", function () {})
  // triggers
    // user clicking it

  // listeners
    // socket.on("player join") - custom event called player join
  // triggers
    // socket.emit("player join") - fire all of the .on("player join") handlers



socket.on('player join', function(username){
  $('#messages').append($('<li>').text(username + ' has joined the room'));
});
socket.emit('player join', window.location.pathname, username);
socket.emit('join room', window.location.pathname, username);


$('form').submit(function(){
  socket.emit('chat message', window.location.pathname, (username + ": " +  $('#m').val()));
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('card movement', function(data){
  console.log(data);
  cards.forEach(function(card){
    if (card.id == data.id) {
      card.x = data.x;
      card.y = data.y;
    }
  });
});
