const UnauthorizedError = require("../../base/UnauthorizedError");

class NotYetValidTokenError extends UnauthorizedError {

    constructor() {
        super('Token en attente de validation');
    }

}

module.exports = NotYetValidTokenError;
