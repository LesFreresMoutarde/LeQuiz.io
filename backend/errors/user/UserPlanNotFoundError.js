const NotFoundError = require("../base/NotFoundError");

class UserPlanNotFoundError extends NotFoundError {

    constructor() {
        super('Plan inconnu');
    }
}

module.exports = UserPlanNotFoundError;
