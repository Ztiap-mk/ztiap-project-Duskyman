class NothingState {
    constructor() {
        this.text = 'Super Snake 4001'
        this.animation = 0
        this.entity = new Entity({
            size: { x: 20, y: 20 },
            position: { x: 50, y: 50 },
        })
        this.animatedEntity = new AnimatedEntity({
            size: { x: 20, y: 20 },
            position: { x: 100, y: 50 },
            animationSize: {x: 3, y: 3},
            animationFramesCount: 6,
            backgroundColor: 'pink',
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

        this.animatedEntity.animationSource = globals.assets.images.example
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
        this.animatedEntity.update(dt)
        this.stars.forEach((star) => star.update(dt))
    }
    render(dt, {ctx, canvas}) {
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '25px serif'
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(this.animation * 2 * Math.PI * -1)
        ctx.scale(
            1 + Math.sin(this.animation * Math.PI * 2) / 4,
            1 + Math.sin(this.animation * Math.PI * 2) / 4
        )
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
        this.entity.draw(ctx)
        this.animatedEntity.draw(ctx)
        this.stars.forEach((star) => star.draw(ctx))
    }
    dispose() {}
}
