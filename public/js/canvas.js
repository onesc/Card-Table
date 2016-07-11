
var cards = [];

var card = new DragImage('/images/ace.png', 300, 50);
cards.push(card);
var card = new DragImage('https://i.ytimg.com/vi/5UTWBLOuW8s/hqdefault.jpg?custom=true&w=320&h=180&stc=true&jpg444=true&jpgq=90&sp=68&sigh=kZ_jfTgIkbVzZDOBFI8gXRlsTQE', 400, 200);
cards.push(card);

function drawCard(deck) {
  card = deck.pop();
  return card;
}

function cardToHand() {
  var newCard = drawCard(deck);
  var card = new DragImage(newCard.src, 300, 300);
  cards.push(card);
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
