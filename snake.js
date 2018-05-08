"use strict";
exports.__esModule = true;
var Snake = /** @class */ (function () {
    function Snake() {
        this.positions = [new Coordinate(2, 2)];
    }
    Snake.prototype.nextHead = function (direction) {
        console.log("length" + this.positions.length);
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
        this.position = new Coordinate(Math.round(Math.random() * 47), Math.round(Math.random() * 26));
    }
    return Apple;
}());
var Coordinate = /** @class */ (function () {
    function Coordinate(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    Coordinate.prototype.eq = function (other) {
        return this.x == other.x && this.y == other.y;
    };
    return Coordinate;
}());
var Direction = /** @class */ (function () {
    function Direction(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    Direction.prototype.findAdjCoord = function (coord) {
        return new Coordinate(((coord.x + this.x) % 48 + 48) % 48, ((coord.y + this.y) % 27 + 27) % 27);
    };
    Direction.prototype.perpendicular = function (other) {
        return (this.x * other.getX() + this.y * other.getY()) == 0;
    };
    Direction.prototype.getX = function () {
        return this.x;
    };
    Direction.prototype.getY = function () {
        return this.y;
    };
    Direction.NORTH = new Direction(0, -1);
    Direction.EAST = new Direction(1, 0);
    Direction.SOUTH = new Direction(0, 1);
    Direction.WEST = new Direction(-1, 0);
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
            console.log("reset..");
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
