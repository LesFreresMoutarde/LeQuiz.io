const UnauthorizedError = require("../../base/UnauthorizedError");

class MalformedTokenError extends UnauthorizedError {

    constructor() {
        super('Token malformé');
    }

}

module.exports = MalformedTokenError;
