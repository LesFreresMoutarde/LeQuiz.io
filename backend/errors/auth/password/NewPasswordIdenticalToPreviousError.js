const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class NewPasswordIdenticalToPreviousError extends UnprocessableEntityError {

    constructor() {
        super('Le nouveau mot de passe est identique au mot de passe actuel')
    }


}

module.exports = NewPasswordIdenticalToPreviousError;
