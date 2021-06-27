class InternalServerError extends Error {

    constructor() {
        super();
        this.message = 'Internal Server Error';
        this.status = 500;
    }
}
module.exports = InternalServerError;
