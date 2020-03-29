class GameStartingState extends State {
    init({ buttons, gameData }) {
        buttons.newGame.disabled = true
        buttons.pause.disabled = false
        buttons.reset.disabled = false

        gameData.snake = {
            parts: [
                { direction: 'right', position: { x: 10, y: 5 } },
                { direction: 'right', position: { x: 10, y: 5 } },
            ],
        }
    }
    update(dt, globals) {
        while (globals.events.length) {
            const [event] = globals.events.splice(0, 1)
            if (event.type === 'click' && event.id === 'resetBut') {
                globals.changeState(STATES.NOTHING)
            }
        }
    }

    render(dt, { ctx }) {
        drawBackground(ctx)
    }
}
