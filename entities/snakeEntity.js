const ANIMATION_POSES = {
    up: 0,
    right: 1,
    down: 2,
    left: 3,
}

class SnakeEntity extends Entity {
    constructor(options) {
        const defaults = {
            direction: 'right',
            walkInterval: 1000,
            walkTime: 0,
            parts: [
                { direction: 'right', position: { x: 10, y: 5 } },
                { direction: 'right', position: { x: 10, y: 5 } },
            ]
        }
        super({...defaults, ...options})
        this.parts = this.parts.map((part) => ({...part, entity: this.createNewPartEntity({position: part.position, direction: part.direction})}))
    }

    moveSnake(direction) {
        this.walkTime = Math.max(0, this.walkTime - this.walkInterval)
        const len = this.parts.length

        this.parts.forEach((part, index) => {
            if (index < len - 1) {
                const previousPart = this.parts[len - index - 2]
                this.parts[len - index - 1].position = {...(previousPart.position)}
                this.parts[len - index - 1].direction = {...(previousPart.direction)}
                this.parts[len - index - 1].entity.animationPose = ANIMATION_POSES[previousPart.direction]
                this.parts[len - index - 1].entity.position = {...previousPart.entity.position}

            } else {
                if (direction) {
                    this.parts[0].direction = direction
                    this.parts[0].entity.animationPose = ANIMATION_POSES[direction]
                }
                this.parts[0].position = this.getNewPosition(this.parts[0])
                this.parts[0].entity.position = {x: this.parts[0].position.x * 20, y: this.parts[0].position.y * 20}
            }
        })
    }

    getNewPosition(part) {
        const {x,y} = part.position
        switch(part.direction) {
            case 'up': return {x, y: y - 1}
            case 'down': return {x, y: y + 1}
            case 'left': return {x: x - 1, y}
            case 'right': return {x: x + 1, y}
        }
    }

    createNewPartEntity({position, direction}) {
        const newPart = new AnimatedEntity({
            position: {x: position.x * 20, y: position.y * 20},
            animationPose: ANIMATION_POSES[direction],
            animationSource: this.animationSource,
            animationFramesCount: 6,
            size: {x: 20, y: 20},
        })
        return newPart
    }

    update(dt) {
        this.walkTime += dt
        if (this.walkTime > this.walkInterval) {
            this.walkTime -= this.walkInterval
            this.moveSnake()
        }
        this.parts.forEach((part, index) => this.parts[index].entity.update(dt))
    }

    draw(ctx) {
        drawBackground(ctx)
        this.parts.forEach(({entity}) => entity.draw(ctx))
    }
}