const BadRequestError = require("../../base/BadRequestError");

class UserNotFoundByTokenError extends BadRequestError {

    constructor() {
        super('Utilisateur inconnu');
    }

}

module.exports = UserNotFoundByTokenError;
