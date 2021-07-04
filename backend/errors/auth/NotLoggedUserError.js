const BadRequestError = require("../base/BadRequestError");

class NotLoggedUserError extends BadRequestError {

    constructor() {
        super('L\'utilisateur n\'est pas connecté');
    }

}

module.exports = NotLoggedUserError;
