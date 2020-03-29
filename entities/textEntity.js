class TextEntity extends Entity {
    constructor(options) {
        super(options)
        this.text = options.text || ''
        this.textColor = (options && options.textColor) || 'black'
        this.backgroundColor = (options && options.backgroundColor) || 'transparent'
        this.textAlign = 'center'
        this.textBaseline = 'middle'
        this.fontFamily = 'serif'
        this.fontSize = '20px'
    }
    update() {}
    draw(ctx) {
        ctx.save()
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.font = `${this.fontSize} ${this.fontFamily}`
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.scale.x, this.scale.y)
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(-(this.size.x / 2), -(this.size.y / 2), this.size.x, this.size.y)
        ctx.fillStyle = this.textColor
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }
}
