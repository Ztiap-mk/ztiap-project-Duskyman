class AnimatedEntity extends Entity {
    constructor(options) {
        this.animationIndex = 0
        this.animationFramesCount = 0
        this.animationSpeed = 1000 / 24
        this.animationProgress = 0
        this.animationPose = 0
        this.animationSize = { x: 0, y: 0 }
        this.animationSource = ''
        super(options)
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
        ctx.restore()
    }
}
