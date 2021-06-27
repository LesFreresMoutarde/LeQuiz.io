class UnprocessableEntityError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.status = 422;
    }
}

module.exports = UnprocessableEntityError;
