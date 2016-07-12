var canvas = $("#c");
var c = canvas[0].getContext("2d");
canvas.width = 1500;
canvas.height = 900;
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
    socket.emit('card movement', window.location.pathname, {item: itemBeingDragged, x: itemBeingDragged.x, y:itemBeingDragged.y, id: itemBeingDragged.id});
    itemBeingDragged = false;
});

var itemBeingDragged = false;

function DragImage(src, x, y) {

    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
    this.id = cards.length;
    this.width = 150;
    this.height = 240;
    var img = new Image();
    img.src = src;

    this.update = function() {
        if (mousePressed){
            var left = that.x;
            var right = that.x + img.width;
            var top = that.y;
            var bottom = that.y + img.height;
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
                that.width = 100;
                that.height = 140;
              } else {
                that.width = 150;
                that.height = 240;
              }
        }
        c.drawImage(img, that.x, that.y, that.width, that.height);
    }
}
