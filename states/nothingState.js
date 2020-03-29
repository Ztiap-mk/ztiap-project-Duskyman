class NothingState {
    constructor() {
        this.text = 'Super Snake 4001'
        this.animation = 0
        this.entity = new Entity({
            size: { x: 20, y: 20 },
            position: { x: 50, y: 50 },
        })
        this.stars = [
            new UselessRotatingStar({
                position: { x: 100, y: 30 },
            }),
            new UselessRotatingStar({
                position: { x: 70, y: 200 },
            }),
            new UselessRotatingStar({
                position: { x: 350, y: 250 },
            }),
            new UselessRotatingStar({
                position: { x: 320, y: 80 },
            }),
            new UselessRotatingStar({
                position: { x: 150, y: 260 },
            }),
        ]
    }
    init(globals) {
        globals.buttons.newGame.disabled = false
        globals.buttons.pause.disabled = true
        globals.buttons.reset.disabled = true
    }
    update(dt, globals) {
        while (globals.events.length) {
            const [event] = globals.events.splice(0, 1)
            if (event.type === 'click' && event.id === 'newGameBut') {
                globals.changeState(STATES.GAME_STARTING)
            }
        }

        this.animation = (dt / 3000 + this.animation) % 1
        this.entity.rotation = this.animation * Math.PI * 2
        this.stars.forEach((star) => star.update(dt))
    }
    render(dt, globals) {
        globals.ctx.save()
        globals.ctx.textAlign = 'center'
        globals.ctx.textBaseline = 'middle'
        globals.ctx.font = '25px serif'
        globals.ctx.translate(globals.canvas.width / 2, globals.canvas.height / 2)
        globals.ctx.rotate(this.animation * 2 * Math.PI * -1)
        globals.ctx.scale(
            1 + Math.sin(this.animation * Math.PI * 2) / 4,
            1 + Math.sin(this.animation * Math.PI * 2) / 4
        )
        globals.ctx.fillText(this.text, 0, 0)
        globals.ctx.restore()
        this.entity.draw(globals.ctx)
        this.stars.forEach((star) => star.draw(globals.ctx))
    }
    dispose() {}
}
