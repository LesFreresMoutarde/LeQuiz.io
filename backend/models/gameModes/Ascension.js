const GameMode = require('./GameMode');

class Ascension extends GameMode {
    constructor() {
        super()
    }

    getWinCondition() {
        return true;
    }
}

module.exports = Ascension;