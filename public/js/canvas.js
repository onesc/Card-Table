var deck = [];
var cards = [];
var deckcount = deck.length;
var XposCounter = 200;
var YposCounter = 140;


socket.emit('request game state', window.location.pathname);
socket.on('load state', function(state, roomdeck){
  console.log("deck returned " + roomdeck);
  cards = [];
  roomdeck.forEach(function(deckCard){
    deck = roomdeck;
  });
  if (deck.length === 0) {
    console.log("tryna init deck");
    deck = initDeck();
  }
  state.forEach(function(card){
    var newCard = new DragImage(card.permSrc, card.x, card.y, card.faceDown, card.id, card.owner);
    cards.push(newCard);
  });
});

socket.on('card movement', function(data){
  console.log(data);
  cards.forEach(function(card){
    if (card.id == data.id) {
      card.owner = data.owner;
      card.x = data.x;
      card.y = data.y;
      if (data.shiftDown) {
        console.log("got into client side shiftdown");
        if(card.faceDown) {
          console.log("got into facedown was true");
          card.img.src = card.permSrc;
          card.faceDown = false;
        } else {
          console.log("got into facedown was false");
          card.img.src = "/images/cardback.jpg";
          card.faceDown = true;
        }
      }
    }
  });
});

socket.on('draw new card', function(card){
  console.log("got inside draw new card client");
  var cardToDraw = new DragImage(card[0], card[1], card[2], card[3], card[4], card[5]);
  cards.push(cardToDraw);
  if (XposCounter < 800){
    XposCounter += 100;
  } else {
    XposCounter = 200;
    YposCounter +=70;
    if (YposCounter == 70 * 6) {
      YposCounter = 140;
    }
  }


  socket.emit('store game state', window.location.pathname, cards, deck);
});

socket.on('load deck', function(deckReceived){
  deck = deckReceived;
});


$("#drawButton").click(function(){
  var newCard = deck.pop();
  var card = [newCard.src, XposCounter, YposCounter, false, cards.length + 1, false];
  socket.emit('draw new card', window.location.pathname, card, username);
});

$("#drawFDButton").click(function(){
  var newCard = deck.pop();
  var card = [newCard.src, XposCounter, YposCounter, true, cards.length + 1, false];
  socket.emit('draw new card', window.location.pathname, card, username);
});

$("#shuffleButton").click(function(){
  for(var j, x, i = deck.length; i; j = parseInt(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
  socket.emit('shuffle and store deck', window.location.pathname, deck, username);
});

$("#resetButton").click(function(){
  deck = initDeck();
  cards = [];
  socket.emit('store game state', window.location.pathname, cards, deck);
  socket.emit('request game state', window.location.pathname);
});


var handLine = new Image();
handLine.src = "/images/line.png";

var loop = setInterval(function() {


    c.fillStyle = "gainsboro";
    c.fillRect(0, 0, 2000, 2000);
    c.drawImage(handLine, 0, (canvas.height * 0.8), canvas.width, 20);
    cards.forEach(function(object){
      object.update();
    });
}, 30);
