class Snake {
    positions: Coordinate[];

    constructor() {
        this.positions = [new Coordinate(2, 2)];
    }

    public nextHead(direction: Direction): Coordinate {
        console.log("length" + this.positions.length)
        return direction.findAdjCoord(this.positions[0])
    }

    public move(direction: Direction, eating: boolean) {
        this.positions.unshift(this.nextHead(direction));
        if (!eating) {
            this.positions.pop();
        }
    }

    public crash(nextHead: Coordinate): boolean {
        return !this.positions.every(p => {
            return !nextHead.eq(p)
        });
    }
}

class Apple {
    position: Coordinate;

    constructor() {
        this.position = new Coordinate(
            Math.round(Math.random()*47), 
            Math.round(Math.random()*26)
        );
    }
}

class Coordinate {
    x: number;
    y: number;

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public eq(other: Coordinate): boolean {
        return this.x == other.x && this.y == other.y;
    }
}

export class Direction {
    public static NORTH = new Direction(0, -1);
    public static EAST = new Direction(1, 0);
    public static SOUTH = new Direction(0, 1);
    public static WEST = new Direction(-1, 0);

    private x: number;
    private y: number;

    protected constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public findAdjCoord(coord: Coordinate): Coordinate {
        return new Coordinate(
            ((coord.x + this.x) % 48 + 48) % 48,
            ((coord.y + this.y) % 27 + 27) % 27
        );
    }

    public perpendicular(other: Direction): boolean {
        return (this.x * other.getX() + this.y * other.getY()) == 0;
    }

    public getX(): number{
        return this.x;
    }

    public getY(): number{
        return this.y;
    }
}

export class GameState {
    snake: Snake;
    apple: Apple;
    movementQueue: Direction[];
    currentMove: Direction;

    constructor() {
        this.snake = new Snake();
        this.apple = new Apple();
        this.movementQueue = []
        this.currentMove = Direction.EAST;
    }

    public update() {
        this.currentMove = this.movementQueue.length == 0 ? this.currentMove : this.movementQueue.pop()
        var nextHead = this.snake.nextHead(this.currentMove);

        if (this.snake.crash(nextHead)) {
            console.log("reset..")
            this.snake = new Snake();
            this.apple = new Apple();
            this.movementQueue = []
            this.currentMove = Direction.EAST;
        }

        var eating = nextHead.eq(this.apple.position);
        if (eating) {
            this.apple = new Apple();
        }
        this.snake.move(this.currentMove, eating);
    }

    public queueDirection(direction: Direction) {
        if(direction.perpendicular(this.movementQueue[0] || this.currentMove)){
            this.movementQueue.unshift(direction);
        }
    }
}