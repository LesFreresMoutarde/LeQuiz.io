const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class AlreadyUsedEmailError extends UnprocessableEntityError {

    constructor() {
        super('Cette adresse email est déjà utilisée');
    }

}

module.exports = AlreadyUsedEmailError;
