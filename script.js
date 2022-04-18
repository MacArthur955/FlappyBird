let button = document.getElementById('button');
let canvas = document.getElementById('canvas');
    canvas.width = 256;
    canvas.height = 512;
let bird = new Image();
    bird.src = 'images\\bird.png';
let back = new Image();
    back.src = 'images\\back.png';
let pipeBottom = new Image();
    pipeBottom.src = 'images\\pipeBottom.png';
let pipeUp = new Image();
    pipeUp.src = 'images\\pipeUp.png';
let road = new Image();
    road.src = 'images\\road.png';
let ctx = canvas.getContext('2d');


let start = false, gravity = 0, speed = 0, y = 200, pipes = [], score = 0;
function draw() {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(bird, 70, y);
    for (i=0; i<pipes.length; i++) {
        if (pipes[i].x < -80) pipes.shift();
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + 100);
        if (collision(pipes[i])) break;
        pipes[i].x -= 3;
    }
    ctx.drawImage(road, 0, 450);
    y += speed, speed += gravity;
    if (y + bird.height > 450) restart();
}
function restart(){
    y = 200, speed = 0, gravity = 0, start = false;
        button.style.visibility = 'visible';
        clearInterval(randomPipe);
        pipes = [];
        return true;
}
function collision(object){
    if (y < object.y + pipeUp.height || y + bird.height > object.y + pipeUp.height + 100){
        if (70 + bird.width > object.x && 70 < object.x + pipeUp.width) return restart();
    }
}


setInterval(draw, 20);
addEventListener('click', event => {
    if (start) speed = -5;
    else {
        start = true, gravity = 0.3;
        button.style.visibility = 'hidden';
        level = 1500;
        randomPipe = setInterval(() => pipes.push({'x':300, 'y':Math.floor(Math.random()*-200)}), 1500);
    }
});