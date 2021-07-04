const UnprocessableEntityError = require("../../base/UnprocessableEntityError");

class AlreadyUsedUsernameError extends UnprocessableEntityError {

    constructor() {
        super('Ce nom d\'utilisateur est déjà utilisé');
    }

}

module.exports = AlreadyUsedUsernameError;
