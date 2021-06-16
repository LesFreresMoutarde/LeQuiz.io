const GameMode = require('./GameMode');

class Serie extends GameMode {

    static CLASSNAME = 'Serie';
    static LABEL = 'Série';
    static DESCRIPTION = `
    Le joueur ayant le score le plus élevé à la fin d'une série de questions remporte la partie.`;

    static WIN_CRITERION =  {
        type: 'number',
        label: 'Nombre de questions'
    };


}

module.exports = Serie;
