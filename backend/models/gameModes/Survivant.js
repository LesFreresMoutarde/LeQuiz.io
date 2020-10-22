const GameMode = require('./GameMode')

class Survivant extends GameMode {
    constructor(){
        super()
    }

    getWinCondition(){
        return true;
    }
}

module.exports = Survivant;