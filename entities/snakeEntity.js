const ANIMATION_POSES = {
    up: 0,
    right: 1,
    down: 2,
    left: 3,
    upRight: 4,
    rightDown: 5,
    downLeft: 6,
    leftUp: 7,
    upLeft: 8,
    leftDown: 9,
    downRight: 10,
    rightUp: 11,
    headUp: 12,
    headRight: 13,
    headDown: 14,
    headLeft: 15,
    tailUp: 16,
    tailRight: 17,
    tailDown: 18,
    tailLeft: 19,
}

class SnakeEntity extends Entity {
    constructor(options) {
        const defaults = {
            direction: 'right',
            walkInterval: 1000,
            walkTime: 0,
        }

        super({ ...defaults, ...options })

        // this cannot be used befor calling super
        this.parts = [...Array(10)].map((part, index, parts) => this.createNewPartEntity({
            position: {x: 10, y: 5},
            index,
            length: parts.length,
        }))
        this.parts[0].animationPose=ANIMATION_POSES.headRight
    }

    // if direction is defined, it was user-triggered, otherwise enough time has passed that snake should move
    moveSnake(direction) {
        this.walkTime = Math.max(0, this.walkTime - this.walkInterval)
        const len = this.parts.length

        if (direction) {
            this.direction = direction
        }

        // update positions
        this.parts.forEach((_, index) => {
            const i = this.parts.length - 1 - index
            const part = this.parts[i] // this is ok because we copy reference
            if (i === 0) {
                part.position = this.getNewPosition(this.parts[i].position)
            } else {
                part.position = {...(this.parts[i - 1].position)} // copy this
            }
        })

        // update directions
        this.parts.forEach((part, index) => {
            this.parts[index].animationPose = this.getNewAnimationPose(part, index)
        })
    }

    getNewPosition({ x, y }) {
        switch (this.direction) {
            case 'up':
                return { x, y: y - 20 }
            case 'down':
                return { x, y: y + 20 }
            case 'left':
                return { x: x - 20, y }
            case 'right':
                return { x: x + 20, y }
        }
    }

    // this function expects that only one coordinate is different
    getDirectionToPoint({x: fromX, y: fromY}, {x: toX, y: toY}) {
        if (toX < fromX) return 'left'
        if (toX > fromX) return 'right'
        if (toY < fromY) return 'up'
        if (toY > fromY) return 'down'
        return 'right'
    }

    getNewAnimationPose(part, index) {
        const headOffset = 12
        const tailOffset = 16
        if (index === 0) {
            return ANIMATION_POSES[this.direction] + headOffset
        }
        if (index === this.parts.length - 1) {
            const tailDirection = this.getDirectionToPoint(part.position, this.parts[index - 1].position)
            return ANIMATION_POSES[tailDirection] + tailOffset
        }
        const backD = this.getDirectionToPoint(this.parts[index + 1].position, part.position)
        const frontD = this.getDirectionToPoint(part.position, this.parts[index - 1].position)

        if (backD === frontD) {
            return ANIMATION_POSES[frontD]
        }

        const corner = backD + frontD.slice(0, 1).toUpperCase() + frontD.slice(1)

        return ANIMATION_POSES[corner]
    }

    createNewPartEntity({ position, direction, index, length }) {
        let headOrTailOffset = 0

        // display head instead of body
        if (index === 0) {
            headOrTailOffset = 12
        }

        // display tail instead of body
        if (index === length-1) {
            headOrTailOffset = 16
        }
        const newPart = new AnimatedEntity({
            position: { x: position.x * 20, y: position.y * 20 },
            animationPose: ANIMATION_POSES[direction] + headOrTailOffset,
            animationSource: this.animationSource,
            animationSize: { x: 24, y: 24 },
            animationFramesCount: 12,
            animationIndex: 0, // index % 12
            size: { x: 20, y: 20 },
        })
        return newPart
    }

    update(dt) {
        this.walkTime += dt
        if (this.walkTime > this.walkInterval) {
            this.walkTime -= this.walkInterval
            this.moveSnake()
        }
        this.parts.forEach((part, index) => this.parts[index].update(dt))
    }

    draw(ctx) {
        drawBackground(ctx)
        this.parts.forEach((_, index) => this.parts[this.parts.length - 1 - index].draw(ctx))
    }
}
