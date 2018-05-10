"use strict";
exports.__esModule = true;
var snake_1 = require("./snake");
var snake_2 = require("./snake");
var snake_3 = require("./snake");
var state = new snake_1.GameState();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var zBright = Math.floor(255 / snake_3.Constants.Z_TILES);
var draw = function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var rectX = Math.round(canvas.width / snake_3.Constants.X_TILES);
    var rectY = Math.round(canvas.height / snake_3.Constants.Y_TILES);
    // clear
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw snake
    var drawnXY = [];
    for (var i = 0; i < snake_3.Constants.Z_TILES; i++) {
        ctx.fillStyle = 'rgb(0,' + zBright * i + ',50)';
        state.snake.positions.forEach(function (p) {
            if (p.z == i) {
                ctx.fillRect(rectX * p.x, rectY * p.y, rectX, rectY);
            }
        });
        // draw apples
        if (state.apple.position.z == i) {
            ctx.fillStyle = 'rgb(' + zBright * i + ',50, 0)';
            ctx.fillRect(rectX * state.apple.position.x, rectY * state.apple.position.y, rectX, rectY);
        }
    }
};
var step = function (t1) { return function (t2) {
    if (t2 - t1 > snake_3.Constants.GAME_SPEED) {
        state.update();
        draw();
        window.requestAnimationFrame(step(t2));
    }
    else {
        window.requestAnimationFrame(step(t1));
    }
}; };
window.addEventListener('keydown', function (k) {
    switch (k.key) {
        case 'w':
            state.queueDirection(snake_2.Direction.NORTH);
            break;
        case 'd':
            state.queueDirection(snake_2.Direction.EAST);
            break;
        case 's':
            state.queueDirection(snake_2.Direction.SOUTH);
            break;
        case 'a':
            state.queueDirection(snake_2.Direction.WEST);
            break;
        case 'e':
            state.queueDirection(snake_2.Direction.IN);
            break;
        case 'q':
            state.queueDirection(snake_2.Direction.OUT);
            break;
    }
});
window.requestAnimationFrame(step(0));
