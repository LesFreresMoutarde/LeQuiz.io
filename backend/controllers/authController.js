const jwt = require('jsonwebtoken');
const InvalidTokenTypeError = require('../errors/auth/InvalidTokenTypeError');

class AuthController {
    static TOKEN_TYPE_ACCESS_TOKEN = 'accessToken';
    static TOKEN_TYPE_REFRESH_TOKEN = 'refreshToken';

    static refreshTokens = [];

    constructor() {
        // TODO From config (env...)
        this.jwtSecret = 'superSecret';
        this.accessTokenLifetime = 3;
        this.refreshTokenLifetime = 6;
    }

    actionVerifyToken = (req, res) => {
        const token = req.headers.authorization;
        res.status(200);
        const response = {
            valid: true,
        };
        const verification = this.verifyToken(token, [AuthController.TOKEN_TYPE_ACCESS_TOKEN, AuthController.TOKEN_TYPE_REFRESH_TOKEN]);
        if(verification.verified) {
            response.valid = true;
            response.type = verification.payload.type;
        } else {
            response.valid = false;
            response.error = verification.error;
        }

        res.send(response);
    }

    actionAccessToken = (req, res) => {
        let fromRefreshToken = false;
        if(req.query.refreshToken !== undefined) {
            fromRefreshToken = true;
        }

        if(fromRefreshToken) {
            const inputRefreshToken = req.query.refreshToken;
            const response = {};

            if(!AuthController.refreshTokens.includes(inputRefreshToken)) {
                res.status(400);
                response.error = 'Unknown refresh token';
                res.send(response);
                return;
            }

            const verification = this.verifyToken(inputRefreshToken, AuthController.TOKEN_TYPE_REFRESH_TOKEN);
            if(!verification.verified) {
                response.error = verification.error
                res.status(400);
                res.send(response);
                return;
            }

            const refreshTokenPayload = verification.payload;

            const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, refreshTokenPayload);
            const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, refreshTokenPayload);

            this.invalidateRefreshToken(inputRefreshToken);
            this.saveRefreshToken(newRefreshToken);

            response.accessToken = newAccessToken;
            response.refreshToken = newRefreshToken;
            res.send(response);
            return;
        }

        const fakeUserId = Math.ceil(Math.random() * 10000);

        const accessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, {userId: fakeUserId});
        const refreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, {userId: fakeUserId});

        this.saveRefreshToken(refreshToken);

        res.send({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
        });
    }

    /**
     * Verifies a JWT token, and optionnaly its type
     * @param token string
     * @param type string|string[] (optional) if set, the token must be of that type (accessToken, refreshToken)
     * @return {{
     *     verified: boolean
     *     payload: object
     *     error: string
     * }}
     */
    verifyToken = (token, type = null) => {
        const result = {};

        try {
            const payload = jwt.verify(token, this.jwtSecret);
            if(type !== null) { // Verify token type (accessToken/refreshToken)
                this.verifyTokenType(payload, type);
            }

            result.verified = true;
            result.payload = payload;
            return result;
        } catch(e) {
            result.verified = false;
            switch(e.constructor.name) {
                case 'JsonWebTokenError':
                    result.error = 'Malformed token';
                    break;
                case 'TokenExpiredError':
                    result.error = 'Token has expired';
                    break;
                case 'NotBeforeError':
                    result.error = 'Token is not yet valid';
                    break;
                case 'InvalidTokenTypeError':
                    result.error = e.message;
                    break;
                default:
                    throw e;
            }

            return result;
        }
    }

    /**
     * Verifies the type contained in a JWT token payload
     * @param tokenPayload object
     * @param expectedTypes string|string[]
     * @throw InvalidTokenTypeError if token type does not match
     */
    verifyTokenType = (tokenPayload, expectedTypes) => {
        if(!tokenPayload.hasOwnProperty('type')) {
            throw new InvalidTokenTypeError('Token type not found in payload');
        }

        if(typeof expectedTypes === 'string') {
            expectedTypes = [expectedTypes];
        }

        if(!expectedTypes.includes(tokenPayload.type)) {
            throw new InvalidTokenTypeError(`Type ${tokenPayload.type} does not match any expected type (${expectedTypes.join(', ')})`);
        }
    }

    /**
     * Generates an access/refresh token, optionnally from an initial payload
     * @param type string
     * @param initialPayload object
     * @returns {string}
     */
    generateToken = (type, initialPayload = {}) => {
        let expiresIn;
        switch(type) {
            case AuthController.TOKEN_TYPE_ACCESS_TOKEN:
                expiresIn = this.accessTokenLifetime;
                break;
            case AuthController.TOKEN_TYPE_REFRESH_TOKEN:
                expiresIn = this.refreshTokenLifetime;
                break;
            default:
                throw new InvalidTokenTypeError();
        }

        const payload = {...initialPayload};
        delete payload.iat;
        delete payload.exp;
        delete payload.type;

        payload.type = type;

        return jwt.sign(payload, this.jwtSecret, {
            expiresIn,
        });
    }

    invalidateRefreshToken = (refreshToken) => {
        // TODO database
        const index = AuthController.refreshTokens.indexOf(refreshToken);
        if(index > -1) AuthController.refreshTokens.splice(index, 1);
    }

    saveRefreshToken = (refreshToken) => {
        // TODO database
        AuthController.refreshTokens.push(refreshToken);
    }
}

module.exports = new AuthController();