var canvas = $("#c");
var c = canvas[0].getContext("2d");
canvas.width = 1500;
canvas.height = 900;

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
    console.log(itemBeingDragged.x, itemBeingDragged.y);
    itemBeingDragged = false;
});

var itemBeingDragged = false;

function DragImage(src, x, y) {
    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
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
        }
        c.drawImage(img, that.x, that.y);
    }
}
