import { GameState } from './snake';
import { Direction } from './snake';
import { Constants } from './snake';

var state = new GameState();

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const zBright = Math.floor(255/Constants.Z_TILES)

const draw = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var rectX = Math.floor(canvas.width / Constants.X_TILES);
    var rectY = Math.floor(canvas.height / Constants.Y_TILES);

    // clear
    ctx.fillStyle = '#232323'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw snake
    var drawnXY = [];
    for (var i = 0; i < Constants.Z_TILES; i++) {
        ctx.fillStyle = 'rgb(0,' + zBright*i + ',50)';
        state.snake.positions.forEach(
            p => {
                if (p.z == i) {
                    ctx.fillRect(
                        rectX * p.x,
                        rectY * p.y,
                        rectX,
                        rectY);
                }
            })

        // draw apples
        if (state.apple.position.z == i) {
            ctx.fillStyle = 'rgb(' + zBright*i + ',50, 0)';
            ctx.fillRect(
                rectX * state.apple.position.x,
                rectY * state.apple.position.y,
                rectX,
                rectY)
        }
    }
}

const step = t1 => t2 => {
    if (t2 - t1 > Constants.GAME_SPEED) {
        state.update()
        draw()
        window.requestAnimationFrame(step(t2))
    } else {
        window.requestAnimationFrame(step(t1))
    }
}



window.addEventListener('keydown', k => {
    switch (k.key) {
        case 'w':
            state.queueDirection(Direction.NORTH);
            break;
        case 'd':
            state.queueDirection(Direction.EAST);
            break;
        case 's':
            state.queueDirection(Direction.SOUTH);
            break;
        case 'a':
            state.queueDirection(Direction.WEST);
            break;
        case 'e':
            state.queueDirection(Direction.IN);
            break;
        case 'q':
            state.queueDirection(Direction.OUT);
            break;
    }
});



window.requestAnimationFrame(step(0));