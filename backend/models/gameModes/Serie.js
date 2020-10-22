const GameMode = require('./GameMode')

class Serie extends GameMode {
    constructor() {
        super()
    }

    getWinCondition() {
        return true;
    }
}

module.exports = Serie;