const GameMode = require('./GameMode');

class Blitz extends GameMode {

    static CLASSNAME = 'Blitz';
    static LABEL = 'Blitz';
    static DESCRIPTION = `Le joueur qui marque le plus de points dans un temps imparti remporte la partie.`;

    static WIN_CRITERION =  {
        type: 'time',
        label: 'Durée de la partie'
    };

}

module.exports = Blitz;