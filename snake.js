// window.onload = init
window.addEventListener('load', init)

let game = null

function init() {
    game = new SnakeGame('platno')
    game.onReady(() => {
        game.start()
    })
}

const STATES = {
    NOTHING: new NothingState(),
    GAME_STARTING: new GameStartingState(),
    GAME_PLAY: new State(),
    GAME_OVER: new State(),
}

class SnakeGame {
    constructor(id) {
        this.setup(id)
    }

    async loadAssets() {
        console.log('Loading assets')
        // alert(JSON.stringify(ASSETS_JSON))
        const images = Object.entries(ASSETS_JSON.images)
            .map(([key, name]) => {
                const image = new Image()
                image.src = `assets/images/${name}`
                console.log(`\tloading resource ${key} ("${name}")`)
                const promise = new Promise((resolve) => {
                    image.onload = () => {
                        console.log(`\t\tresource ${key} ("${name}") loaded`)
                        resolve()
                    }
                })
                return {key, image, promise}
            })

        await Promise.all(images.map(({promise}) => promise))

        const result = {images: images.reduce((result,{key,image}) => ({...result, [key]: image}),{})}
        return result
    }

    onReady(cb) {
        this.onReadyFn = cb
    }

    start() {
        this.isRunning = true
        this.lastTick = 0
        requestAnimationFrame((time) => this.tick(time))
    }

    stop() {
        this.isRunning = false
    }

    async setup(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.imageSmoothingEnabled = false // prevent aliasing of neighbouring images in animation sheets
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
            assets: await this.loadAssets(),
        }

        window.addEventListener('keydown', (e) => this.input(e))
        window.addEventListener('keyup', (e) => this.input(e))
        Object.entries(this.buttons).forEach(([key, value]) =>
            value.addEventListener('click', (e) => this.input(e))
        )

        this.state = STATES.NOTHING
        this.state.init(this.globals)
        this.onReadyFn && this.onReadyFn()
    }
    // fixed timestep
    tick(time) {
        const dt = time - this.lastTick // how much time passed from last render
        if (dt >= this.framePeriod) {
            // check if we should change state
            if (this.nextState) {
                this.state.dispose(this.globals)
                this.state = this.nextState
                this.nextState = null
                this.state.init(this.globals)
            }
            this.lastTick = time
            const skipRender = this.update(dt)
            if (!skipRender) {
                this.render(dt)
            }
        }
        requestAnimationFrame((time) => this.tick(time)) // requestAnimationFrame returns time passed since the start of session
    }
    input(e) {
        let reducedEvent
        if (['keydown', 'keyup'].includes(e.type)) {
            reducedEvent = { type: e.type, keyCode: e.keyCode }
        }
        if (['mouseup', 'mousedown', 'click'].includes(e.type)) {
            reducedEvent = { type: e.type, id: e.target.id }
        }
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
