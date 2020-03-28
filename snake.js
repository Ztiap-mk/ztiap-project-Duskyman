// window.onload = init
window.addEventListener('load', init)

let game = null

function init() {
    // console.log('init()')
    game = new SnakeGame('platno')
    game.start()
}

const STATES = {
    NOTHING: {
        init: () => {},
        update: () => {},
        input: (events) => {},
        dispose: () => {},
    },
    GAME_STARTING: {
        init: () => {},
        update: () => {},
        input: (events) => {},
        dispose: () => {},
    },
    GAME_PLAY: {
        init: () => {},
        update: () => {},
        input: (events) => {},
        dispose: () => {},
    },
    GAME_OVER: {
        init: () => {},
        update: () => {},
        input: (events) => {},
        dispose: () => {},
    },
}

class SnakeGame {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.isRunning = false
        this.lastTick = 0
        this.framePeriod = 1000 / 60
        this.setup()
        this.state = STATES.NOTHING
        this.events = []
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
    }

    tick(time) {
        const dt = time - this.lastTick
        if (dt >= this.framePeriod) {
            this.lastTick = time
            this.update(dt)
            this.render(dt)
        }
        requestAnimationFrame((time) => this.tick(time))
    }
    input(e) {
        this.events.push({ type: e.type, keyCode: e.keyCode })
    }
    update(dt) {}
    render(dt) {
        const { ctx, canvas } = this
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText(`${dt.toFixed(1)}`, 100, 100)
    }
}
