const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class InvalidUsernameError extends UnprocessableEntityError {

    constructor() {
        super("Votre nom d'utilisateur ne peut contenir que des caractères alphanumériques et des underscores '_'");

    }
}

module.exports = InvalidUsernameError;
