// window.onload = init
window.addEventListener('load', init)

let game = null

function init() {
    game = new SnakeGame('platno')
    game.start()
}

const STATES = {
    NOTHING: new NothingState(),
    GAME_STARTING: new GameStartingState(),
    GAME_PLAY: new State(),
    GAME_OVER: new State(),
}

class SnakeGame {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.isRunning = false
        this.lastTick = 0
        this.framePeriod = 1000 / 60
        this.events = []
        this.nextState = null
        this.buttons = {
            newGame: document.getElementById('newGameBut'),
            pause: document.getElementById('pauseBut'),
            reset: document.getElementById('resetBut'),
        }
        this.globals = {
            gameData: {},
            canvas: this.canvas,
            ctx: this.ctx,
            events: this.events,
            buttons: this.buttons,
            changeState: (state) => this.changeState(state),
        }
        this.setup()
        this.state = STATES.NOTHING
        this.state.init(this.globals)
    }

    start() {
        this.isRunning = true
        this.lastTick = 0
        requestAnimationFrame((time) => this.tick(time))
    }

    stop() {
        this.isRunning = false
    }

    setup() {
        window.addEventListener('keydown', (e) => this.input(e))
        window.addEventListener('keyup', (e) => this.input(e))
        Object.entries(this.buttons).forEach(([key, value]) =>
            value.addEventListener('click', (e) => this.input(e))
        )
    }

    tick(time) {
        const dt = time - this.lastTick
        if (dt >= this.framePeriod) {
            if (this.nextState) {
                this.state.dispose(this.globals)
                this.state = this.nextState
                this.nextState = null
                this.state.init(this.globals)
            }
            this.lastTick = time
            this.update(dt)
            this.render(dt)
        }
        requestAnimationFrame((time) => this.tick(time))
    }
    input(e) {
        console.log(e)
        let reducedEvent
        if (['keydown', 'keyup'].includes(e.type)) {
            reducedEvent = { type: e.type, keyCode: e.keyCode }
        }
        if (['mouseup', 'mousedown', 'click'].includes(e.type)) {
            reducedEvent = { type: e.type, id: e.target.id }
        }
        console.log(reducedEvent)
        this.events.push(reducedEvent)
    }
    update(dt) {
        this.state.update(dt, this.globals)
    }
    render(dt) {
        const { ctx, canvas } = this
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText(`${dt.toFixed(1)}`, 100, 100)
        this.state.render(dt, this.globals)
    }

    changeState(state) {
        this.nextState = state
    }
}
