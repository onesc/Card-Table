 var deck = [];
var cards = [];
var deckcount = deck.length;
var XposCounter = 250;
var YposCounter = 100;
var idCount = 1;


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
        if(card.faceDown) {
          card.img.src = card.permSrc;
          card.faceDown = false;
        } else {
          card.img.src = "/images/cardback.jpg";
          card.faceDown = true;
        }
      }
    }
  });
});

socket.on('draw new card', function(card, xpos, ypos){
  console.log("xpos received as " + xpos);
  console.log("ypos received as " + ypos);
  deck.pop();
  XposCounter = xpos;
  YposCounter = ypos;
  idCount += 1;
  var cardToDraw = new DragImage(card[0], card[1], card[2], card[3], card[4], card[5], card[6]);
  cards.push(cardToDraw);
  socket.emit('store game state', window.location.pathname, cards, deck);
});

socket.on('load deck', function(deckReceived){
  deck = deckReceived;
});

socket.on('put card on top', function(cardid){
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].id == cardid) {
      deck.push({src: cards[i].permSrc, cardname: cards[i].cardname});
      cards.splice( i, 1 );

    }
  }
});

socket.on('put card on bottom', function(cardid){
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].id == cardid) {
      deck.unshift({src: cards[i].permSrc, cardname: cards[i].cardname});
      cards.splice( i, 1 );
    }
  }
});


$("#drawButton").click(function(){
  if (XposCounter < 1100){
    XposCounter += 100;
  } else {
    XposCounter = 250;
    YposCounter += 70;
    if (YposCounter > 70 * 8) {
      YposCounter = 100;
    }
  }
  var newCard = deck[deck.length - 1];
  var card = [newCard.src, XposCounter, YposCounter, false, idCount, false, newCard.cardname];
  socket.emit('draw new card', window.location.pathname, card, username, XposCounter, YposCounter);
  socket.emit('store game state', window.location.pathname, cards, deck);
});

$("#drawFDButton").click(function(){

  if (XposCounter < 1100){
    XposCounter += 100;
  } else {
    XposCounter = 250;
    YposCounter += 70;
    if (YposCounter > 70 * 8) {
      YposCounter = 100;
    }
  }
  var newCard = deck.pop();
  var card = [newCard.src, XposCounter, YposCounter, true, idCount, false];
  socket.emit('draw new card', window.location.pathname, card, username, XposCounter, YposCounter);
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
    c.globalAlpha = "0.5";
    c.fillStyle = "black";
    c.fillRect(0,240,150,150);

    c.globalAlpha = "1";
    c.font = "10px Verdana";
    c.strokeStyle = "#FFF";
    c.strokeText("PUT CARD ON TOP", 25, 320);


    c.globalAlpha = "0.5";
    c.fillStyle = "black";
    c.fillRect(0,440,150,150);

    c.globalAlpha = "1";
    c.font = "10px Verdana";
    c.strokeStyle = "#FFF";
    c.strokeText("PUT CARD ON BOTTOM", 17, 520);
}, 30);
