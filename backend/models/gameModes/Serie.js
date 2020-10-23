const GameMode = require('./GameMode');

class Serie extends GameMode {

    static CLASSNAME = 'Serie';
    static LABEL = 'Série';
    static DESCRIPTION = `
    Le jeu comporte un nombre défini de questions. À la fin de celles ci le joueur
    ayant le score le plus élevé remporte la partie.`;

    static getWinCondition() {
        return true;
    }
}

module.exports = Serie;