const GameMode = require('./GameMode');

class Ascension extends GameMode {

    static CLASSNAME = 'Ascension';
    static LABEL = 'Ascension';
    static DESCRIPTION = `Le premier joueur à atteindre un score préalablement défini remporte la partie.`;


    static getWinCondition() {
        return true;
    }
}

module.exports = Ascension;