class Entity {
    constructor(options) {
        const defaults = {
            position: {
                x: 0,
                y: 0,
            },
            scale: {
                x: 1,
                y: 1,
            },
            size: {
                x: 0,
                y: 0,
            },
            rotation: 0,
            image: null,
            backgroundColor: '#000'
        }

        // NOTE: potentially buggy - shallow copying!
        Object.entries({...defaults, ...options}).forEach(([key, value]) => {
            this[key] = value
        })
    }
    update() {}
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.backgroundColor
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        if (this.image) {
            ctx.drawImage(this.image, -(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        }
        ctx.restore()
    }
}
