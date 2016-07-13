deck = [];
cards = [];
socket.emit('request game state', window.location.pathname);
socket.on('load state', function(state, roomdeck){
  console.log("deck returned " + roomdeck);
  roomdeck.forEach(function(deckCard){
    deck = roomdeck;
  });
  state.forEach(function(card){
    var newCard = new DragImage(card.permSrc, card.x, card.y, card.faceDown, card.id);
    cards.push(newCard);
  });
});

socket.on('card movement', function(data){
  console.log(data);
  cards.forEach(function(card){
    if (card.id == data.id) {
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

socket.on('draw new card', function(card){
  console.log("got inside draw new card client");
  var cardToDraw = new DragImage(card[0], card[1], card[2], card[3], card[4]);
  cards.push(cardToDraw);
});



function shuffle(deck){
    for(var j, x, i = deck.length; i; j = parseInt(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x) ;
    return deck;
}

function drawCard(deck) {
  card = deck.pop();
  return card;
}

function cardToHand(deck) {
  var newCard = drawCard(deck);
  var card = [newCard.src, 300, 300, true, cards.length + 1];
  socket.emit('draw new card', window.location.pathname, card);
  socket.emit('store game state', window.location.pathname, cards, deck);
}

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
