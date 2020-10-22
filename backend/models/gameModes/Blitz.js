const GameMode = require('./GameMode');

class Blitz extends GameMode {

    static CLASSNAME = 'Blitz';
    static LABEL = 'Blitz';
    static DESCRIPTION = `Le joueur qui marque le plus de points dans un temps imparti remporte la partie.`;

    static getWinCondition() {
        return true;
    }
}

module.exports = Blitz;