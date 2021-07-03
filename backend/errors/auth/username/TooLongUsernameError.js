const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class TooLongUsernameError extends UnprocessableEntityError {

    constructor() {
        super('Votre nom d\'utilisateur doit faire maximum 30 caractères');
    }

}

module.exports = TooLongUsernameError;
