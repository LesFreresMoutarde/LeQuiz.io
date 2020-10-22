const GameMode = require('./GameMode');

class Blitz extends GameMode {
    constructor() {
        super()
    }

    getWinCondition() {
        return true;
    }
}

module.exports = Blitz;