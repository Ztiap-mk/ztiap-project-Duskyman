class AnimatedEntity extends Entity {
    constructor(options) {
        const defaults = {
            animationIndex: 0,
        animationFramesCount: 0,
        animationSpeed: 1000 / 24,
        animationProgress: 0,
        animationPose: 0,
        animationSize: { x: 3, y: 3 },
        animationSource: null
        }
        super({...defaults, ...options})
    }
    update(dt) {
        this.animationProgress += dt
        if (this.animationProgress >= this.animationSpeed) {
            this.animationProgress -= this.animationSpeed
            this.animationIndex = (this.animationIndex + 1) % this.animationFramesCount
        }
    }
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.backgroundColor
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        if (this.animationSource) {
            ctx.drawImage(
                this.animationSource,
                this.animationIndex * this.animationSize.x,
                this.animationPose * this.animationSize.y,
                this.animationSize.x,
                this.animationSize.y,
                -(this.size.x / 2),
                -(this.size.y / 2),
                this.size.x,
                this.size.y
            )
        }
        ctx.restore()
    }
}
