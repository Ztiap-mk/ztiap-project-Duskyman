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
                    })
            )
    }
    update(dt) {
        this.entities
    }
}
