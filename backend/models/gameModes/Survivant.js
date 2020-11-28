const GameMode = require('./GameMode');

class Survivant extends GameMode {

    static CLASSNAME = 'Survivant';
    static LABEL = 'Survivant';
    static DESCRIPTION = `
    Dans cette série de questions éliminatoires, le dernier joueur encore en lice remporte la partie`;

    getWinCondition() {
        return true;
    }
}

module.exports = Survivant;