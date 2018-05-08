import{GameState} from './snake';
import{Direction} from './snake';

var state = new GameState();

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const draw = () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    var rectX = Math.round(canvas.width / 48);
    var rectY = Math.round(canvas.height / 27);

    // clear
    ctx.fillStyle = '#232323'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    // draw snake
    ctx.fillStyle = 'rgb(0,200,50)'
    state.snake.positions.forEach(
        p => ctx.fillRect(
            rectX*p.x, 
            rectY*p.y, 
            rectX, 
            rectY)
        )
  
    // draw apples
    ctx.fillStyle = 'rgb(255,50,0)'
    ctx.fillRect(
        rectX*state.apple.position.x, 
        rectY*state.apple.position.y, 
        rectX, 
        rectY)
  
  }

const step = t1 => t2 => {
    if (t2 - t1 > 100) {
        state.update()
        draw()
        window.requestAnimationFrame(step(t2))
    } else {
        window.requestAnimationFrame(step(t1))
    }
}

  

window.addEventListener('keydown', k =>{
    switch (k.key){
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
    }
});



window.requestAnimationFrame(step(0));