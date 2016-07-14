var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var NodeCache = require( "node-cache" );
var rooms = [];
var userid = 0;


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});




// GENERAL ROOM
io.on('connection', function(socket){
  console.log("CONNECTION MADE");


  socket.on('join room', function(roomname, username){
    socket.user = username;
    socket.roomname = roomname;
    socket.userid = userid + 1;
    userid += 1;
    socket.join(roomname);
    rooms.forEach(function(room){
      if(room.path == roomname) {
        room.users.push({name: username, id: socket.userid});
      }
    });
    console.log(socket.user + ' joined ' + roomname);
    rooms.forEach(function(room){
      console.log(room);
    });
  });

  socket.on('say to room', function(path){
    io.sockets.in(path).emit('chat message', "barnt");
  });

  socket.on('generate room', function(username){
      generateRoom();
  });

  socket.on('chat message', function(path, msg){
    io.sockets.in(path).emit('chat message', msg);
  });

  socket.on('card movement', function(path, data){
    io.sockets.in(path).emit('card movement', data);
  });

  socket.on('draw new card', function(path, card, username){
    io.sockets.in(path).emit('draw new card', card);
    io.sockets.in(path).emit('chat message', username + " drew a card");
  });

  socket.on('shuffle and store deck', function(path, deck, username){
    rooms.forEach(function(room){
      if (room.path == path){
        room.deck = deck;
      }
    });
    io.sockets.in(path).emit('load deck', deck);
    io.sockets.in(path).emit('chat message', username + " shuffled the deck");
  });

  socket.on('player join', function(path, username){
    io.sockets.in(path).emit('player join', username);
  });

  socket.on('store game state', function(path, state, deck){
    rooms.forEach(function(room){
      if (room.path == path){
        room.state = state;
        room.deck = deck;
      }
      console.log(room);
    });
  });



    socket.on('request game state', function(path){
      var stateToGive;
      var deckToGive;
      rooms.forEach(function(room){
        if (room.path == path){
          stateToGive = room.state;
          deckToGive = room.deck;
        }
      });
      console.log('request game state gave back ' + stateToGive);
      io.sockets.in(path).emit('load state', stateToGive, deckToGive);
    });

  socket.on('disconnect', function() {
    io.sockets.in(socket.roomname).emit('chat message', socket.user + " has left the room");
    rooms.forEach(function(room){
      if (socket.roomname == room.path) {
        room.users = room.users.filter(function(el){
          return el.id !== socket.userid;
        });
        console.log(room.users.length + " users in " + socket.roomname);
        }
      });
    console.log(socket.user + " left " + socket.roomname);
  });

});
//
http.listen(3000, function(){
  console.log('listening on *:3000');
});

function generateRoom() {
  var randString = Math.random().toString(36).substring(7);
  app.get('/' + randString,function(req, res) {
    res.sendFile(__dirname + '/table.html');
  });
  rooms.push({path: '/' + randString, users: [], state: [], deck: []});
  io.emit('redirect to room', randString);
  return randString;
}


//
// var ay = setInterval(function() {
//   io.sockets.in('room1').emit('chatmessage', "sup");
// }, 500);
//
//
//
//
//
//
//
// //
// //
// // var myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
// // obj = { my: "Special", variable: 42 };
// // myCache.set( "myKey", obj, function( err, success ){
// //   if( !err && success ){
// //     console.log( success );
// //     // true
// //     // ... do something ...
// //   }
// // });
// //
// //
// // myCache.get( "myKey", function( err, value ){
// //   if( !err ){
// //     if(value == undefined){
// //       console.log("meme");
// //     }else{
// //       console.log( value );
// //       //{ my: "Special", variable: 42 }
// //       // ... do something ...
// //     }
// //   }
// // });
