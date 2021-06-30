const NotFoundError = require("../base/NotFoundError");

class BadCredentialsError extends NotFoundError {

    constructor() {
        super('Les informations saisies ne correspondent à aucun utilisateur');
    }

}

module.exports = BadCredentialsError;
