const UnauthorizedError = require("../../base/UnauthorizedError");

class IncorrectPasswordError extends UnauthorizedError {

    constructor() {
        super('Mot de passe incorrect');
    }

}

module.exports = IncorrectPasswordError;
