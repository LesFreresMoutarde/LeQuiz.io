const UnauthorizedError = require("../../base/UnauthorizedError");

class InvalidRefreshTokenError extends UnauthorizedError {

    constructor() {
        super('Refresh token invalide');
    }

}

module.exports = InvalidRefreshTokenError;
