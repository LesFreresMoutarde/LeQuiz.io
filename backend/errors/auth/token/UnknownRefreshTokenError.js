const UnauthorizedError = require("../../base/UnauthorizedError");

class UnknownRefreshTokenError extends UnauthorizedError {

    constructor() {
        super('Refresh Token inconnu');
    }

}

module.exports = UnknownRefreshTokenError;
