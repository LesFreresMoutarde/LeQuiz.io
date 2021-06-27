const UnauthorizedError = require("../base/UnauthorizedError");

class UnknownPlanError extends UnauthorizedError {
    constructor() {
        super('Unknown Plan');
    }
}

module.exports = UnknownPlanError;
