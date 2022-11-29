var painter = document.getElementById("c").getContext("2d"); 
var pipes = [ [250, 200, 50, 120],[350, 150, 50, 100],[480, 100, 50, 50] ]; // [x, y, w, h] of the passage
var pipe_dx = -2;
var birdX = 50;
var birdY = 100;
var g = 0.1;
var birdDy = 0; // delta y, the increasement of birdY in an interval
var birdSize = 20;
var jump = -5;
var timer;
var score = 0;


drawFrame ();

document.addEventListener('keydown', onkeydown);

function init () {
    pipes = [ [250, 200, 50, 120],[350, 150, 50, 100],[480, 100, 50, 50] ];
    birdY = 100;
    birdDy = 0; // delta y, the increasement of birdY in an interval
    score = 0;
    timer = setInterval(drawFrame, 20);
}

function onkeydown (e) {
    if (e.key === 'Enter') {
        init();
    } else if (e.key === ' ') {
        birdDy += jump;
    }
}

function updatePipes () {
    for (var i = 0; i < pipes.length; ++i) {
        var pipe = pipes[i];
        pipe[0] += pipe_dx;
        // if any pipe is outside the left, then place it to the right
        if (pipe[0] < 0-pipe[2]) {
            pipe[0] = 400 + Math.random()*(50-10)+10; // 400 + 10~50
            score ++;
        }
    }
}
function updateBird () {
    birdDy += g;
    birdY += birdDy;
}
function isOver () {
    for (var i = 0; i < pipes.length; ++i) {
        var pipe = pipes[i];
        //bird is in the upper rect
        if (isXyInRect(birdX, birdY, pipe[0], 0, pipe[2], pipe[1]) ||
        isXyInRect(birdX+birdSize, birdY, pipe[0], 0, pipe[2], pipe[1])) {
            return true;
        }
        // bird is in the lower rect // bug found
        if (isXyInRect(birdX, birdY+birdSize, pipe[0], pipe[1]+pipe[3], pipe[2], pipe[1]) ||
    isXyInRect(birdX+birdSize, birdY+birdSize, pipe[0], pipe[1]+pipe[3], pipe[2], 400-pipe[1]-pipe[3])) {
            return true;
    }
}
//top edge or bottom edge
if (birdY <= 0 || birdY >= 400-birdSize) {
    return true;
}
    return false;
}

function drawFrame () {
    //detect collision
    if (isOver()) {
        // show game is over, clear the timer
        drawGameOver ();
        clearInterval(timer);
        return;

    }
    //update data
    updatePipes ();
    updateBird ();
    //draw
    drawBackground();
    drawPipes ();
    drawBird ();
    drawScore ();
}
function drawBird () {
    painter.fillStyle = "#FF0000";
    painter.fillRect(birdX, birdY, birdSize, birdSize);
}
function drawBackground () {
    // sky
    painter.fillStyle = "#00FFFF";
    painter.fillRect(0,0,400,300);
    // separater
    painter.fillStyle = "#000000";
    painter.fillRect(0,300,400,10);
    // ground
    painter.fillStyle = "#FFC300";
    painter.fillRect(0,310,400,90);
}
function drawPipes () {
    painter.fillStyle = "#00FF00";
    for (var i = 0; i < pipes.length; ++i) {
        pipe = pipes[i];
        // draw the upper rectangle
        painter.fillRect(pipe[0],0,pipe[2],pipe[1]);
        // draw the lower rectangle
        painter.fillRect(pipe[0],pipe[1]+pipe[3],pipe[2],400-pipe[1]-pipe[3]);
    }
}

function isXyInRect (x,  y,  rx,  ry,  rw,  rh) {   
    if (x >= rx && x <= rx+rw && y >= ry && y <= ry + rh) {
        return true;
    } else {
        return false;
    }
}

function drawGameOver () {
    painter.font = "50px Arial";
    painter. fillStyle = "#000000";
    painter.textBaseline = "top";
    painter.textAllign = "center";
    painter.fillText('GAME OVER!', 50, 200);
}

function drawScore () {
    painter.font = "20px Arial";
    painter. fillStyle = "#FFFFFF";
    painter.textBaseline = "top";
    painter.textAllign = "left";
    painter.fillText('score: ' + score, 10, 10);
}

//100 - 200
Math.random()*(200-100)+100