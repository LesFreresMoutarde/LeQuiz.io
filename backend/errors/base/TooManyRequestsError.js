class TooManyRequestsError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.status = 429
    }

}

module.exports = TooManyRequestsError;
