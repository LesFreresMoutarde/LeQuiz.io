const BadRequestError = require("../base/BadRequestError");

class EmptyBodyError extends BadRequestError {

    constructor() {
        super('Formulaire incomplet');
    }

}

module.exports = EmptyBodyError;
