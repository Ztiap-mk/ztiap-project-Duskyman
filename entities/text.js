class Text extends Entity {
    constructor(options) {
        this.text = ''
        super(options)
        this.backgroundColor = (options && options.backgroundColor) || 'transparent'
        this.textAlign = 'center'
        this.textBaseline = 'center'
        this.fontFamily = 'serif'
        this.fontSize = '20px'
    }
    update() {}
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.backgroundColor
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.font = `${this.fontSize} ${this.fontFamily}`
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        ctx.fillText(this.text, this.position.x, this.position.y)
        ctx.restore()
    }
}
