
var socket = io();
var username = prompt("Pick a Name");



socket.on('player join', function(username){
  $('#messages').append($('<li>').text(username + ' has joined the room'));
});
socket.emit('player join', window.location.pathname, username);
socket.emit('join room', window.location.pathname, username);


socket.on('disconnect', function(){
  socket.emit('user left');
});

$('form').submit(function(){
  socket.emit('chat message', window.location.pathname, (username + ": " +  $('#m').val()));
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
