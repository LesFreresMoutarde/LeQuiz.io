class InternalServerError extends Error {

    constructor() {
        super();
        this.message = 'Erreur interne du serveur. Réessayez plus tard';
        this.status = 500;
    }
}
module.exports = InternalServerError;
