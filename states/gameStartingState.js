class GameStartingState extends State {
    init({buttons, gameData}) {
        buttons.newGame.disabled = true
        buttons.pause.disabled = false
        buttons.reset.disabled = false


    }
    update(dt, globals) {
        while (globals.events.length) {
            const [event] = globals.events.splice(0,1)
            if (event.type === 'click' && event.id === 'resetBut') {
                globals.changeState(STATES.NOTHING)
            }
        }
    }
}