
var cards = [];

var card = new DragImage('/images/ace.png', 200, 100);
cards.push(card);
var card = new DragImage('https://assets.servedby-buysellads.com/p/manage/asset/id/24209', 400, 200);
cards.push(card);

var loop = setInterval(function() {
    c.fillStyle = "gainsboro";
    c.fillRect(0, 0, 2000, 2000);
    cards.forEach(function(card){
      card.update();
    });
}, 30);
