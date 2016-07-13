var canvas = $("#c");
var c = canvas[0].getContext("2d");
c.width = 1500;
c.height = 900;
var cards = [];

console.log(window.location.pathname);

var mouseX = 0, mouseY = 0;
var mousePressed = false;
canvas.mousemove(function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

$(document).mousedown(function(){
    mousePressed = true;
  }).mouseup(function(){
    mousePressed = false;
    if (shiftDown) {
      if(itemBeingDragged.faceDown) {
          itemBeingDragged.img.src = itemBeingDragged.permSrc;
          itemBeingDragged.faceDown = false;
      } else {
          itemBeingDragged.img.src = "/images/cardback.jpg";
          itemBeingDragged.faceDown = true;
      }
    }

    socket.emit('card movement', window.location.pathname, {item: itemBeingDragged, x: itemBeingDragged.x, y:itemBeingDragged.y, id: itemBeingDragged.id});
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


function DragImage(src, x, y) {

    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
    this.id = cards.length;
    this.faceDown = false;


    var img = new Image();
    this.img = img;
    img.width = 150;
    img.height = 240;
    img.src = src;
    this.permSrc = src;

    this.update = function() {
        if (mousePressed){
            var left = that.x;
            var right = that.x + img.width;
            var top = that.y;
            var bottom = that.y + img.height;
            // console.log("-----------------------");
            // console.log('right: ' + right);
            // console.log('mouseX: ' + mouseX);
            // console.log('bottom: ' + bottom);
            // console.log('mouseY: ' + mouseY);
            // console.log('width: ' + that.width);
            // console.log('height: ' + that.height);
            if (!drag){
              startX = mouseX - that.x;
              startY = mouseY - that.y;
            }
            if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top && itemBeingDragged === false){
              itemBeingDragged = that;
              drag = true;
            }
        }else{
           drag = false;
        }
        if (drag && itemBeingDragged == that){
            that.x = mouseX - startX;
            that.y = mouseY - startY;
              if (mouseY > (canvas.height * 0.8)) {
                that.y = canvas.height * 0.83;
                img.width = 100;
                img.height = 140;
              } else {
                img.width = 150;
                img.height = 240;
              }
        }
        c.drawImage(img, that.x, that.y, img.width, img.height);
    }
}
