class GamePlayState extends State{
    constructor() {
        super({})
        this.codesToDirection = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        }
    }
    init (globals) {
        this.snake = globals.gameData.snake
    }
    update (dt, {events}) {
        while(events.length) {
            const event = events.splice(0,1)[0]
            if (event.type === 'keydown'){
                const direction = this.codesToDirection[event.keyCode]
                if (direction && (this.snake.parts[0].direction !== direction)) {
                    this.snake.moveSnake(direction)
                }
            }
        }
        this.snake.update(dt)
    }
    render (dt, {ctx}) {
        this.snake.draw(ctx)
    }
}