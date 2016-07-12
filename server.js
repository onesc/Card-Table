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

app.get('/meme', function(req, res) {
  res.sendFile(__dirname + '/meme.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('card movement', function(data){
    io.emit('card movement', data);
  });

  socket.on('new user', function(user){
    addUser(user);
  });

  socket.on('generate room', function(username){
      generateRoom();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


function generateRoom() {
  randString = Math.random().toString(36).substring(7);
  app.get('/' + randString,function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  io.emit('redirect to room', randString);
}

var myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
obj = { my: "Special", variable: 42 };
myCache.set( "myKey", obj, function( err, success ){
  if( !err && success ){
    console.log( success );
    // true
    // ... do something ...
  }
});


myCache.get( "myKey", function( err, value ){
  if( !err ){
    if(value == undefined){
      console.log("meme");
    }else{
      console.log( value );
      //{ my: "Special", variable: 42 }
      // ... do something ...
    }
  }
});
