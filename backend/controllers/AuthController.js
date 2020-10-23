const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { Op, QueryTypes } = require('sequelize');
const InvalidTokenTypeError = require('../errors/auth/InvalidTokenTypeError');
const MainController = require('./mainController/MainController');

class AuthController extends MainController {
    static TOKEN_TYPE_ACCESS_TOKEN = 'accessToken';
    static TOKEN_TYPE_REFRESH_TOKEN = 'refreshToken';

    // TODO from a config (env...)
    static JWT_SECRET = 'superSecret';
    static ACCESS_TOKEN_LIFETIME = /*60 * 15*/15; // 15 minutes
    static REFRESH_TOKEN_LIFETIME = /*60 * 60 * 24*/30; // 1 day
    static REFRESH_TOKEN_LIFETIME_STAY_LOGGED_IN = 60 * 60 * 24 * 365 // 1 year

    actionVerifyToken = () => {
        // Access token is already verified in previous middleware, if we are here then the token is OK !

        this.response = {valid: true};
    }

    actionAccessToken = async (inputRefreshToken = null) => {
        let fromRefreshToken = false;
        if(inputRefreshToken !== null) {
            fromRefreshToken = true;
        }

        if(!fromRefreshToken) { // Generate new couple of blank tokens
            const accessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN);
            const refreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN);

            const refreshTokenExpirationDate = new Date();
            refreshTokenExpirationDate.setTime(refreshTokenExpirationDate.getTime() + (AuthController.REFRESH_TOKEN_LIFETIME * 1000));

            await this.saveRefreshToken(refreshToken, refreshTokenExpirationDate);

            this.response = {
                'accessToken': accessToken,
                'refreshToken': refreshToken,
            };

            return;
        }

        // Generate new couple of tokens from a refresh token

        const response = {};

        // if(!AuthController.refreshTokens.includes(inputRefreshToken)) {
        //     response.error = 'Unknown refresh token';
        //     this.response = response;
        //     this.statusCode = 400;
        //     return;
        // }

        const verification = AuthController.verifyToken(inputRefreshToken, AuthController.TOKEN_TYPE_REFRESH_TOKEN);
        if(!verification.verified) {
            response.error = verification.error
            this.response = response;
            this.statusCode = 400;
            return;
        }

        const records = await db.sequelize.query(
            'SELECT * FROM "refresh_token" WHERE "token" = :token',
            {
                replacements: {
                    token: inputRefreshToken,
                },
                type: QueryTypes.SELECT,
            }
        );

        if(records.length < 1) {
            response.error = 'Unknown refresh token';
            this.response = response;
            this.statusCode = 400;
            return;
        }

        const dbRefreshToken = records[0];

        const refreshTokenPayload = verification.payload;

        // Check if userId associated to refreshToken in db matches with refreshToken payload
        let userIdsMatch = true;
        if(dbRefreshToken.userId === null) {
            if(refreshTokenPayload.hasOwnProperty('user')) {
                userIdsMatch = false;
            }
        } else {
            if(refreshTokenPayload.hasOwnProperty('user')) {
                if(refreshTokenPayload.user.id !== dbRefreshToken.userId) {
                    userIdsMatch = false;
                }
            } else {
                userIdsMatch = false;
            }
        }

        if(!userIdsMatch) {
            response.error = 'Invalid refresh token user';
            this.response = response;
            this.statusCode = 400;
            return;
        }

        // Check if user exists
        if(verification.payload.user) {
            const userId = verification.payload.user.id;

            const user = await db.User.findOne({
                where: {
                    id: userId
                }
            });

            if(user === null) {
                response.error = 'User not found';
                this.statusCode = 400;
                this.response = response;
                return;
            }

            // TODO check if user is banned
        }

        const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, refreshTokenPayload);
        const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, refreshTokenPayload);

        await this.invalidateRefreshToken(inputRefreshToken);

        const refreshTokenExpirationDate = new Date();
        refreshTokenExpirationDate.setTime(refreshTokenExpirationDate.getTime() + (AuthController.REFRESH_TOKEN_LIFETIME * 1000));

        await this.saveRefreshToken(newRefreshToken, refreshTokenExpirationDate, dbRefreshToken.userId);

        response.accessToken = newAccessToken;
        response.refreshToken = newRefreshToken;
        this.response = response;
    }

    actionLogin = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['username', 'password', 'stayLoggedIn'];
        const missingFields = [];
        const badCredentialsResponse = {
            error: 'The provided credentials do not correspond to any user',
        };

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

        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { username: requestBody.username },
                    { email: requestBody.username },
                ],
            },
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = badCredentialsResponse;
            return;
        }

        const userPasswordHash = user.password;

        if(!(await argon2.verify(userPasswordHash, requestBody.password))) {
            this.statusCode = 404;
            this.response = badCredentialsResponse;
            return;
        }

        // TODO check if user is banned

        const currentAccessTokenPayload = {...accessTokenPayload};
        const newAccessTokenPayload = Object.assign(currentAccessTokenPayload, {
            user: {
                id: user.id,
                username: user.username,
                plan: user.plan,
                role: user.role,
            }
        });

        const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, newAccessTokenPayload);
        const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, newAccessTokenPayload);

        const refreshTokenExpirationDate = new Date();
        refreshTokenExpirationDate.setTime(refreshTokenExpirationDate.getTime() + (AuthController.REFRESH_TOKEN_LIFETIME * 1000));

        await this.saveRefreshToken(newRefreshToken, refreshTokenExpirationDate, user.id);

        this.response = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
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
    static verifyToken = (token, type = null) => {
        const result = {};

        try {
            const payload = jwt.verify(token, AuthController.JWT_SECRET);
            if(type !== null) { // Verify token type (accessToken/refreshToken)
                AuthController.verifyTokenType(payload, type);
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
    static verifyTokenType = (tokenPayload, expectedTypes) => {
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

        return jwt.sign(payload, AuthController.JWT_SECRET, {
            expiresIn,
        });
    }

    invalidateRefreshToken = async (refreshToken) => {
        await db.sequelize.query(
            'DELETE FROM "refresh_token" WHERE token = :token',
            {
                replacements: {
                    token: refreshToken,
                },
                type: QueryTypes.DELETE,
            },
        );
    }

    saveRefreshToken = async (refreshToken, expirationDate, userId = null) => {
        await db.sequelize.query(
            'INSERT INTO "refresh_token" ("token", "userId", "expirationDate") VALUES (:token, :userId, :expirationDate)',
            {
                replacements: {
                    token: refreshToken,
                    userId,
                    expirationDate,
                },
                type: QueryTypes.INSERT,
            },
        );
    }
}

module.exports = AuthController;