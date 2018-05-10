(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Snake = /** @class */ (function () {
    function Snake() {
        this.positions = [new Coordinate(2, 2, 2)];
    }
    Snake.prototype.nextHead = function (direction) {
        return direction.findAdjCoord(this.positions[0]);
    };
    Snake.prototype.move = function (direction, eating) {
        this.positions.unshift(this.nextHead(direction));
        if (!eating) {
            this.positions.pop();
        }
    };
    Snake.prototype.crash = function (nextHead) {
        return !this.positions.every(function (p) {
            return !nextHead.eq(p);
        });
    };
    return Snake;
}());
var Apple = /** @class */ (function () {
    function Apple() {
        this.position = new Coordinate(Math.round(Math.random() * (Constants.X_TILES - 1)), Math.round(Math.random() * (Constants.Y_TILES - 1)), Math.round(Math.random() * (Constants.Z_TILES - 1)));
    }
    return Apple;
}());
var Coordinate = /** @class */ (function () {
    function Coordinate(_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }
    Coordinate.prototype.eq = function (other) {
        return this.x == other.x && this.y == other.y && this.z == other.z;
    };
    return Coordinate;
}());
var Direction = /** @class */ (function () {
    function Direction(_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }
    Direction.prototype.findAdjCoord = function (coord) {
        function mod(n, modulus) {
            return (n % modulus + modulus) % modulus;
        }
        return new Coordinate(mod(coord.x + this.x, Constants.X_TILES), mod(coord.y + this.y, Constants.Y_TILES), mod(coord.z + this.z, Constants.Z_TILES));
    };
    Direction.prototype.perpendicular = function (other) {
        return (this.x * other.getX() + this.y * other.getY() + this.z * other.getZ()) == 0;
    };
    Direction.prototype.getX = function () {
        return this.x;
    };
    Direction.prototype.getY = function () {
        return this.y;
    };
    Direction.prototype.getZ = function () {
        return this.z;
    };
    Direction.NORTH = new Direction(0, -1, 0);
    Direction.EAST = new Direction(1, 0, 0);
    Direction.SOUTH = new Direction(0, 1, 0);
    Direction.WEST = new Direction(-1, 0, 0);
    Direction.IN = new Direction(0, 0, -1);
    Direction.OUT = new Direction(0, 0, 1);
    return Direction;
}());
exports.Direction = Direction;
var GameState = /** @class */ (function () {
    function GameState() {
        this.snake = new Snake();
        this.apple = new Apple();
        this.movementQueue = [];
        this.currentMove = Direction.EAST;
    }
    GameState.prototype.update = function () {
        this.currentMove = this.movementQueue.length == 0 ? this.currentMove : this.movementQueue.pop();
        var nextHead = this.snake.nextHead(this.currentMove);
        if (this.snake.crash(nextHead)) {
            this.snake = new Snake();
            this.apple = new Apple();
            this.movementQueue = [];
            this.currentMove = Direction.EAST;
        }
        var eating = nextHead.eq(this.apple.position);
        if (eating) {
            this.apple = new Apple();
        }
        this.snake.move(this.currentMove, eating);
    };
    GameState.prototype.queueDirection = function (direction) {
        if (direction.perpendicular(this.movementQueue[0] || this.currentMove)) {
            this.movementQueue.unshift(direction);
        }
    };
    return GameState;
}());
exports.GameState = GameState;
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.X_TILES = 16;
    Constants.Y_TILES = 9;
    Constants.Z_TILES = 4;
    Constants.GAME_SPEED = 400;
    return Constants;
}());
exports.Constants = Constants;

},{}],2:[function(require,module,exports){
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

},{"./snake":1}]},{},[2]);
