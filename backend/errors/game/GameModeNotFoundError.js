const NotFoundError = require("../base/NotFoundError");

class GameModeNotFoundError extends NotFoundError {

    constructor () {
       super('Mode de jeu inconnu');
    }
}

module.exports = GameModeNotFoundError;
