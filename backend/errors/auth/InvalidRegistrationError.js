const UnprocessableEntityError = require("../base/UnprocessableEntityError");

class InvalidRegistrationError extends UnprocessableEntityError {

    constructor(errors) {
        super(errors);
    }

}

module.exports = InvalidRegistrationError;
