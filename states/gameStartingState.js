class GameStartingState extends State {
    constructor(options) {
        super(options)

        this.countdown = new TextEntity({
            text: '3',
            fontSize: 30
        })
    }

    init({ buttons, gameData, canvas, assets }) {
        buttons.newGame.disabled = true
        buttons.pause.disabled = false
        buttons.reset.disabled = false

        gameData.snake = new SnakeEntity({
            animationSource: assets.images.example
        })

        this.countdownValue = 3
        this.animation = 0
        this.countdown.text = String(this.countdownValue)
        this.countdown.position = {x: canvas.width / 2, y: canvas.height / 2}
    }

    update(dt, globals) {
        this.animation += dt / 1000
        if (this.animation >= 1) {
            this.animation -= 1
            this.countdownValue -= 1
            if (this.countdownValue > 0) {
                this.countdown.text = String(this.countdownValue)
            } else {
                globals.changeState(STATES.GAME_PLAY)
                return true
            }
        }

        this.countdown.scale = {x: 1 + (1 - this.animation)*5, y: 1 + (1 - this.animation)*5}

        while (globals.events.length) {
            const [event] = globals.events.splice(0, 1)
            if (event.type === 'click' && event.id === 'resetBut') {
                globals.changeState(STATES.NOTHING)
            }
        }
    }
    render(dt, { ctx }) {
        drawBackground(ctx)
        this.countdown.draw(ctx)
    }
}
