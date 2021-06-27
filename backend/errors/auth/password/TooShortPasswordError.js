const UnprocessableEntityError = require("../../base/UnprocessableEntityError");
const PasswordUtil = require("../../../util/PasswordUtil");

class TooShortPasswordError extends UnprocessableEntityError {

    constructor() {
        super(`Le nouveau mot de passe doit faire au moins ${PasswordUtil.MIN_LENGTH} caractères`);
    }
}

module.exports = TooShortPasswordError;
