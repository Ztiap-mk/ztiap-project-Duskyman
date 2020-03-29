class UselessRotatingStar extends Entity {
    constructor(options) {
        super(options)
        this.entities = Array(4)
            .fill(null)
            .map(
                (_, index) =>
                    new Entity({
                        position: options.position,
                        rotation: (index * Math.PI) / 4,
                        size: { x: 20, y: 2 },
                        backgroundColor: '#ff0',
                        animation: Math.random(),
                        animationSpeed: 1.5 - Math.random()
                    })
            )
    }
    update(dt) {
        const animationAdd = (dt / 1000)
        this.entities.forEach(entity => {
            entity.animation = (entity.animation + animationAdd * entity.animationSpeed) % 1
            entity.scale.x = 1 + Math.sin(entity.animation * 2 * Math.PI)
        })
    }
    draw(ctx) {

        this.entities.forEach((entity) => entity.draw(ctx))
    }
}
