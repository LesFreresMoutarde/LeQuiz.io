const ForbiddenError = require("../base/ForbiddenError");

class BannedUserError extends ForbiddenError {

    constructor() {
        super('Utilisateur banni');

    }

}
module.exports = BannedUserError;
