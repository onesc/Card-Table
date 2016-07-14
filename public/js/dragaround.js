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

$(document).mousedown(function(){
    mousePressed = true;
  }).mouseup(function(){
    console.log(itemsSelected);
    itemsSelected = [];
    itemHasBeenSelected = false;
    mousePressed = false;
    // if (shiftDown) {
    //   if(itemBeingDragged.faceDown) {
    //       // itemBeingDragged.img.src = itemBeingDragged.permSrc;
    //       itemBeingDragged.faceDown = false;
    //   } else {
    //       // itemBeingDragged.img.src = "/images/cardback.jpg";
    //       itemBeingDragged.faceDown = true;
    //   }
    // }
    socket.emit('card movement', window.location.pathname, {item: itemBeingDragged, x: itemBeingDragged.x, y:itemBeingDragged.y, id: itemBeingDragged.id, shiftDown: shiftDown, owner: itemBeingDragged.owner});
    socket.emit('store game state', window.location.pathname, cards, deck);
    itemBeingDragged = false;
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


function DragImage(src, x, y, faceDown, id, owner) {
    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
    this.id = id;
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
                  itemBeingDragged = itemsSelected[itemsSelected.length - 1];
                  itemHasBeenSelected = true;
                  startX = mouseX - itemBeingDragged.x;
                  startY = mouseY - itemBeingDragged.y;
                  drag = true;
                }
            }
        }else{
           drag = false;
        }
        if (drag){
            itemBeingDragged.x = mouseX - startX;
            itemBeingDragged.y = mouseY - startY;
              if (mouseY > (canvas.height * 0.8)) {
                itemBeingDragged.y = canvas.height * 0.83;
                img.width = 100;
                img.height = 140;
                itemBeingDragged.owner = username;
                // console.log("itemBeingDragged.owner = " + itemBeingDragged.owner);
              } else {
                img.width = 100 * 1.3;
                img.height = 140 * 1.3;
                itemBeingDragged.owner = false;
                // console.log("this.owner = " + this.owner);
              }
        }
        if (this.owner === false || this.owner == username){
          c.drawImage(img, that.x, that.y, img.width, img.height);
      }
    }

}
