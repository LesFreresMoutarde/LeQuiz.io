const InternalServerError = require("../base/InternalServerError");

class DatabaseError extends InternalServerError {

    constructor() {
        super();
    }
}

module.exports = DatabaseError;
