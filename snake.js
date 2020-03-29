// window.onload = init
window.addEventListener('load', init)

let game = null

function init() {
    // console.log('init()')
    game = new SnakeGame('platno')
    game.start()
}

class Entity {
    constructor(options) {
        this.position = {
            x: 0,
            y: 0,
        }
        this.scale = {
            x: 1,
            y: 1,
        }
        this.size = {
            x: 0,
            y: 0,
        }
        this.rotation = 0
        this.image = null
        this.backgroundColor = "#000"
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillRect(-(this.size.x / 2), -(this.size.y/2), this.size.x, this.size.y)
        ctx.restore()
    }
}

class NothingState {
    constructor() {
        this.text = 'Super Snake 4001'
        this.entity = new Entity()
        this.entity.size = {x: 50, y: 50}
        this.entity.position = {x: 50, y: 50}
        this.animation = 0
    }
    init() {}
    update (dt) {
        this.animation = (dt / 3000 + this.animation) % 1
        this.entity.rotation = this.animation * Math.PI * 2
    }
    render (dt, globals) {
        // globals.ctx.save()
        globals.ctx.save()
        globals.ctx.textAlign = 'center'
        globals.ctx.textBaseline = 'middle'
        globals.ctx.font = '25px serif'
        globals.ctx.translate(globals.canvas.width / 2, globals.canvas.height / 2)
        globals.ctx.rotate((this.animation) * 2*Math.PI * (-1))
        globals.ctx.scale(1 + Math.sin((this.animation)*Math.PI*2) / 4  , 1 + Math.sin((this.animation)*Math.PI*2) / 4)
        globals.ctx.fillText(this.text, 0, 0)
        globals.ctx.restore()
        this.entity.draw(globals.ctx)
    }
    input (events) {}
    dispose() {}
}

const STATES = {
    NOTHING: new NothingState(),
    GAME_STARTING: {
        data: {},
        init: () => {},
        update: () => {},
        render: () => {},
        input: (events) => {},
        dispose: () => {},
    },
    GAME_PLAY: {
        data: {},
        init: () => {},
        update: () => {},
        render: () => {},
        input: (events) => {},
        dispose: () => {},
    },
    GAME_OVER: {
        data: {},
        init: () => {},
        update: () => {},
        render: () => {},
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
        this.nextState = null
        this.globals = {
            canvas: this.canvas,
            ctx: this.ctx,
            events: this.events,
            changeState: (state) => this.changeState(state)
        }
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
            if (this.nextState) {
                this.state.dispose()
                this.state = this.nextState
                this.nextState = null
            }
            this.lastTick = time
            this.update(dt)
            this.render(dt)
        }
        requestAnimationFrame((time) => this.tick(time))
    }
    input(e) {
        this.events.push({ type: e.type, keyCode: e.keyCode })
    }
    update(dt) {
        this.state.update(dt)
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

