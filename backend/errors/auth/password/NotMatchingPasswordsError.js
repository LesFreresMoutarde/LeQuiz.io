const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class NotMatchingPasswordsError extends UnprocessableEntityError {

    constructor() {
        super('Les mots de passe renseignés ne correspondent pas entre eux');
    }

}

module.exports = NotMatchingPasswordsError;
