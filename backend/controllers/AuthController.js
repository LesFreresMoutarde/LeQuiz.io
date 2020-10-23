const jwt = require('jsonwebtoken');
const InvalidTokenTypeError = require('../errors/auth/InvalidTokenTypeError');
const MainController = require('./mainController/MainController');

class AuthController extends MainController {
    static TOKEN_TYPE_ACCESS_TOKEN = 'accessToken';
    static TOKEN_TYPE_REFRESH_TOKEN = 'refreshToken';

    // TODO from a config (env...)
    static JWT_SECRET = 'superSecret';
    static ACCESS_TOKEN_LIFETIME = 3; // seconds
    static REFRESH_TOKEN_LIFETIME = 6; // seconds

    static refreshTokens = [];

    actionVerifyToken = (token) => {
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

        this.response = response;
    }

    actionAccessToken = (inputRefreshToken = null) => {
        let fromRefreshToken = false;
        if(inputRefreshToken !== null) {
            fromRefreshToken = true;
        }

        if(fromRefreshToken) {
            const response = {};

            if(!AuthController.refreshTokens.includes(inputRefreshToken)) {
                response.error = 'Unknown refresh token';
                this.response = response;
                this.statusCode = 400;
                return;
            }

            const verification = this.verifyToken(inputRefreshToken, AuthController.TOKEN_TYPE_REFRESH_TOKEN);
            if(!verification.verified) {
                response.error = verification.error
                this.response = response;
                this.statusCode = 400;
                return;
            }

            const refreshTokenPayload = verification.payload;

            const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, refreshTokenPayload);
            const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, refreshTokenPayload);

            this.invalidateRefreshToken(inputRefreshToken);
            this.saveRefreshToken(newRefreshToken);

            response.accessToken = newAccessToken;
            response.refreshToken = newRefreshToken;
            this.response = response;
            return;
        }

        const accessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN);
        const refreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN);

        this.saveRefreshToken(refreshToken);

        this.response = {
            'accessToken': accessToken,
            'refreshToken': refreshToken,
        };
    }

    actionLogin = (requestBody) => {
        const requiredBodyFields = ['username', 'password', 'stayLoggedIn'];
        const missingFields = [];

        for(const requiredField of requiredBodyFields) {
            if(!requestBody.hasOwnProperty(requiredField)) {
                missingFields.push(requiredField);
            }
        }

        if(missingFields.length > 0) {
            this.statusCode = 400;
            this.response = {
                error: `Missing parameters: ${missingFields.join(', ')}`,
            }
            return;
        }

        console.log(requestBody);
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
            const payload = jwt.verify(token, AuthController.JWT_SECRET);
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
                expiresIn = AuthController.ACCESS_TOKEN_LIFETIME;
                break;
            case AuthController.TOKEN_TYPE_REFRESH_TOKEN:
                expiresIn = AuthController.REFRESH_TOKEN_LIFETIME;
                break;
            default:
                throw new InvalidTokenTypeError();
        }

        const payload = {...initialPayload};
        delete payload.iat;
        delete payload.exp;
        delete payload.type;

        payload.type = type;
        /* A SUPPRIMER UNIQUEMENT POUR TEST */
        payload.userRole = 'premium';
        /* FIN SUPPRESSION */

        return jwt.sign(payload, AuthController.JWT_SECRET, {
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

module.exports = AuthController;