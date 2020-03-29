class NothingState {
    constructor() {
        this.text = 'Super Snake 4001'
        this.animation = 0
        this.entity = new Entity({
            size: { x: 20, y: 20 },
            position: { x: 50, y: 50 },
        })
    }
    init(globals) {
        globals.buttons.pause.disabled = true
        globals.buttons.reset.disabled = true
    }
    update(dt) {
        this.animation = (dt / 3000 + this.animation) % 1
        this.entity.rotation = this.animation * Math.PI * 2
    }
    render(dt, globals) {
        // globals.ctx.save()
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
    }
    input(events) {}
    dispose() {}
}
