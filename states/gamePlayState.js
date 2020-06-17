class GamePlayState extends State{
    constructor() {
        super({})
        this.codesToDirectionMap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        }
    }
    init (globals) {
        this.snake = globals.gameData.snake // TODO: probably unnecessary, we can store the snake in gameplaystate?
    }
    update (dt, {events}) {
        while(events.length) {
            const event = events.splice(0,1)[0]
            if (event.type === 'keydown'){
                const direction = this.codesToDirectionMap[event.keyCode]
                if (this.isDirectionValid(direction)) {
                    this.snake.moveSnake(direction)
                }
            }
        }
        this.snake.update(dt)
    }
    render (dt, {ctx}) {
        this.snake.draw(ctx)
    }

    isDirectionValid(direction) {
        if (!direction) return false
        const horizontal = ['left', 'right']
        const vertical = ['up', 'down']
        if (horizontal.includes(this.snake.direction) && horizontal.includes(direction)) return false
        if (vertical.includes(this.snake.direction) && vertical.includes(direction)) return false
        return true
    }
}