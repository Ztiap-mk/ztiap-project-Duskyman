// window.onload = init
window.addEventListener('load', init)

let game = null

function init() {
    // console.log('init()')
    game = new SnakeGame('platno')
}

class SnakeGame {
    constructor(id) {
        this.ctx = document.getElementById(id).getContext('2d')
        this.isRunning = false
        this.lastTime = 0
        this.framePeriod = 1 / 60
    }

    start() {
        this.isRunning = true
        this.lastTime = 0
        requestAnimationFrame((time) => this.tick(time))
    }

    tick(time) {
        requestAnimationFrame((time) => this.tick(time))
    }
}
