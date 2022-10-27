var painter = document.getElementById("c").getContext("2d");
drawBackground();
drawSquare("#BBBBBB", 0, 0)
drawSquare("#444444", 10, 0)
var big = 10;
var small = 4; 

for (var r = 0; r < 400/big; ++r) {
    for (var c = 0; c < 400/big; ++c){
        var x = 0 + c*big;// everytime, x will be 10 larger than previous
        var y = 0 + r*big;// y will be 10 larger than last time
        var color = "#BBBBBB";
        if (c%2 == 0 && r%2 == 0 || c%2 == 1 && r%2 == 1) { // (even column and row) or (odd column and row)
            var color = "#BBBBBB"
        } else {//odd column
            var color = "#444444"
        }
        drawSquare(color, x, y, big)
    }
}

for (var r = 0; r < 400/big - 1; ++r) {
    for (var c = 0; c < 400/big - 1; ++c){
        var x = 0 + c*big + big-small/2;// everytime, x will be 10 larger than previous
        var y = 0 + r*big + big-small/2;// y will be 10 larger than last time
        
        if ((c+r)%2 == 0) {// (even column and row) or (odd column and row)
            var color = "#000000";
        } else {//odd column
            var color = "#FFFFFF";
        }
        if (r > 1/4 * 400/big & r < 3/4 * 400/big &&
            c > 1/4 * 400/big & c < 3/4 * 400/big) {
            if (color == "#000000")
            color = "#FFFFFF";
            else
            color = "#000000";
        }
        drawSquare(color, x, y, small)
    }
}


function drawBackground() {
painter.fillStyle = "#000000";
painter.fillRect(0, 0, 400, 400);
}

function drawSquare(color, x, y, size) {
painter.fillStyle = color;
painter.fillRect (x, y, size, size)
}

    

