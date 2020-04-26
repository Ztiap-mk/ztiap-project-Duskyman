class SnakeEntity extends Entity {
    constructor() {
        this.direction = 'right'
        this.walkInterval = 1000
        this.walkTime = 0
        this.parts = [
            { direction: 'right', position: { x: 10, y: 5 } },
            { direction: 'right', position: { x: 10, y: 5 } },
        ]
    }

    moveSnake() {
        this.parts.reverse().forEach((part, index) => {
            if (index < this.parts.length - 1) {
                part.position = {...(parts[index+1].position)}
            } else {
                part.position = getNewPosition(part)
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

    update(dt) {
        this.walkTime += dt
        if (this.walkTime > this.walkInterval) {
            this.walkTime -= this.walkInterval

        }
    }

    draw(ctx) {

    }
}