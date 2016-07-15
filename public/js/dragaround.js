var canvas = $("#c");
var c = canvas[0].getContext("2d");
canvas.width = 1500;
canvas.height = 900;

console.log(window.location.pathname);

var mouseX = 0, mouseY = 0;
var mousePressed = false;
canvas.mousemove(function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

var itemsSelected = [];
var itemHasBeenSelected = false;
var putCardOnTop = false;
var putCardOnBottom = false;
var cardPutInHand = false;
var initialY = {
  y: 0,
  set: false
};

$(document).mousedown(function(){
    mousePressed = true;
  }).mouseup(function(){

    console.log(itemsSelected);
    itemsSelected = [];
    itemHasBeenSelected = false;
    mousePressed = false;
    if (putCardOnTop){
      socket.emit('put card on top', window.location.pathname, itemBeingDragged.id, username, itemBeingDragged.cardname, itemBeingDragged.faceDown);
    } else if (putCardOnBottom) {
      socket.emit('put card on bottom', window.location.pathname, itemBeingDragged.id, username, itemBeingDragged.cardname, itemBeingDragged.faceDown);
    } else {
      socket.emit('card movement', window.location.pathname, {item: itemBeingDragged, x: itemBeingDragged.x, y:itemBeingDragged.y, id: itemBeingDragged.id, shiftDown: shiftDown, owner: itemBeingDragged.owner});
    }
    
    if (cardPutInHand){
      var msg;
      if (itemBeingDragged.faceDown === true){
        msg = "a face down card";
      } else {
        msg = itemBeingDragged.cardname;
      }
      socket.emit('chat message', window.location.pathname, (username + " put " + msg + " in their hand"));
    }

    socket.emit('store game state', window.location.pathname, cards, deck);
    itemBeingDragged = false;
    cardPutInHand = false;
    putCardOnTop = false;
    putCardOnBottom = false;
    initialY = {
      y: 0,
      set: false
    };
});
var itemBeingDragged = false;
var shiftDown = false;

$(document).keydown(function (e) {
    if (e.keyCode == 16) {
      shiftDown = true;
    }
});

$(document).keyup(function (e) {
    if (e.keyCode == 16) {
      shiftDown = false;
    }
});


function DragImage(src, x, y, faceDown, id, owner, cardname) {
    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
    this.id = id;
    this.cardname = cardname;
    this.faceDown = faceDown;
    var img = new Image();
    this.img = img;

    img.width = 100 * 1.3;
    img.height = 140 * 1.3;
    if (faceDown === false){
    img.src = src;
  } else {
    img.src = "/images/cardback.jpg";
  }
    this.permSrc = src;
    this.owner = owner;
    this.update = function() {
        if (mousePressed){
            var left = that.x;
            var right = that.x + img.width;
            var top = that.y;
            var bottom = that.y + img.height;
            if (!drag){
              // startX = mouseX - that.x;
              // startY = mouseY - that.y;
            }
            if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top && itemBeingDragged === false){
                if(itemsSelected.length === 0 || that.id !== itemsSelected[0].id) {
                  itemsSelected.push(that);
                } else {

                if (itemsSelected[itemsSelected.length - 1].owner === false || itemsSelected[itemsSelected.length - 1].owner === username) {
                      itemBeingDragged = itemsSelected[itemsSelected.length - 1];
                      itemHasBeenSelected = true;
                      if (!initialY.set){
                        initialY.set = true;
                        initialY.y = itemBeingDragged.y;
                      }
                      startX = mouseX - itemBeingDragged.x;
                      startY = mouseY - itemBeingDragged.y;
                      drag = true;
                      }
                }
            }
        }else{
           drag = false;
        }
        if (drag){
            itemBeingDragged.x = mouseX - startX;
            itemBeingDragged.y = mouseY - startY;


              if (mouseY > 240 && mouseY < 390 && mouseX < 150){
                itemBeingDragged.img.width = 100;
                itemBeingDragged.img.height = 140;
                putCardOnTop = true;

              } else if (mouseY > 440 && mouseY < 590 && mouseX < 150) {
                itemBeingDragged.img.width = 100;
                itemBeingDragged.img.height = 140;
                putCardOnBottom = true;
              }

              else if (mouseY > (canvas.height * 0.8)) {
                putCardOnTop = false;
                putCardOnBottom = false;
                itemBeingDragged.y = canvas.height * 0.83;
                itemBeingDragged.img.width = 100;
                itemBeingDragged.img.height = 140;
                itemBeingDragged.owner = username;
                if (initialY.y !== itemBeingDragged.y){
                  console.log(initialY.y + "" + itemBeingDragged.y);
                  cardPutInHand = true;
                }
              } else {
                putCardOnTop = false;
                putCardOnBottom = false;
                itemBeingDragged.img.width = 100 * 1.3;
                itemBeingDragged.img.height = 140 * 1.3;
                itemBeingDragged.owner = false;
              }
        }
        if (this.owner === false || this.owner == username){
          c.drawImage(img, that.x, that.y, img.width, img.height);
      }
    }

}
