var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
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
