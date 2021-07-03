const BadRequestError = require("../base/BadRequestError");

class MissingParametersError extends BadRequestError {

    constructor(missingParameters) {
        super(`Paramètres manquants: ${missingParameters}`);
    }
}

module.exports = MissingParametersError;
