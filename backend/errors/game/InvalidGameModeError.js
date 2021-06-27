const UnauthorizedError = require("../base/UnauthorizedError");

class InvalidGameModeError extends UnauthorizedError {

    constructor () {
       super('Invalid Game Mode');
    }
}

module.exports = InvalidGameModeError;
