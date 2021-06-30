const NotFoundError = require("../base/NotFoundError");

class BadCredentialsError extends NotFoundError {

    constructor(message = 'Les informations saisies ne correspondent à aucun utilisateur') {
        super(message);
    }

}

module.exports = BadCredentialsError;
