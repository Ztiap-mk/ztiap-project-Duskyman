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
        this.backgroundColor = '#000'

        // note: potentionally buggy - shallow copying!
        Object.entries(options).forEach(([key, value]) => {
            console.log(key, value)
            this[key] = value
        })
        console.log(this, Object.entries(options))
    }
    update() {}
    draw(ctx) {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        ctx.restore()
    }
}
