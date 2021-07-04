const UnauthorizedError = require("../../base/UnauthorizedError");

class ExpiredTokenError extends UnauthorizedError {

    constructor() {
        super('Token expiré');
    }

}

module.exports = ExpiredTokenError;
