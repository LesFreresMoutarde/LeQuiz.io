const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class InvalidEmailError extends UnprocessableEntityError {

    constructor() {
        super('Cette adresse email est invalide');
    }

}

module.exports = InvalidEmailError;
