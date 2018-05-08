"use strict";
exports.__esModule = true;
var snake_1 = require("./snake");
var snake_2 = require("./snake");
var state = new snake_1.GameState();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var draw = function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    function x(c) { return Math.round(c * canvas.width / 48); }
    ;
    function y(r) { return Math.round(r * canvas.height / 27); }
    ;
    // clear
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw snake
    ctx.fillStyle = 'rgb(0,200,50)';
    state.snake.positions.map(function (p) { return ctx.fillRect(x(p.x), y(p.y), x(1), y(1)); });
    // draw apples
    ctx.fillStyle = 'rgb(255,50,0)';
    ctx.fillRect(x(state.apple.position.x), y(state.apple.position.y), x(1), y(1));
    // add crash
    if (state.snake.positions.length == 0) {
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};
var step = function (t1) { return function (t2) {
    if (t2 - t1 > 100) {
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
    }
});
window.requestAnimationFrame(step(0));
