const UnauthorizedError = require("../../base/UnauthorizedError");

class InvalidTokenTypeError extends UnauthorizedError {

    constructor(message) {
        super(message);
    }

}

module.exports = InvalidTokenTypeError;
