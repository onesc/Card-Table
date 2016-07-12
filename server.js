var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var NodeCache = require( "node-cache" );
var rooms = [];

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/test', function(req, res, next){

  res.sendFile(__dirname + '/test.html');
});

app.get('/meme', function(req, res) {
  res.sendFile(__dirname + '/meme.html');
});



// GENERAL ROOM
io.on('connection', function(socket){
  console.log("CONNECTION MADE");

  socket.on("some event", function () {
    console.log("ALL USERS IN ROOM 1 SHOULD SEE THIS");
  });

  socket.on('join room', function(roomname, username){
    socket.join(roomname);
    console.log(username + ' joined ' + roomname);
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
  socket.on('player join', function(path, username){
    io.sockets.in(path).emit('player join', username);
  });

});
//
http.listen(3000, function(){
  console.log('listening on *:3000');
});

function generateRoom() {
  var randString = Math.random().toString(36).substring(7);
  app.get('/' + randString,function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  rooms.push({path: '/' + randString});
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
