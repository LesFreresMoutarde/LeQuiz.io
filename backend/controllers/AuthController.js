const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { Op, QueryTypes } = require('sequelize');
const EmailUtil = require("../util/EmailUtil");
const InvalidTokenTypeError = require('../errors/auth/InvalidTokenTypeError');
const MainController = require('./mainController/MainController');
const PasswordUtil = require("../util/PasswordUtil");
const RandomUtil = require("../util/RandomUtil");
const env = require('../config/env');

class AuthController extends MainController {
    static TOKEN_TYPE_ACCESS_TOKEN = 'accessToken';
    static TOKEN_TYPE_REFRESH_TOKEN = 'refreshToken';

    static JWT_SECRET = env.jwtSecret;
    static ACCESS_TOKEN_LIFETIME = 60 * 15; // 15 minutes
    static REFRESH_TOKEN_LIFETIME = 60 * 60 * 24; // 1 day
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


        const response = {};

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

        if(user.isBanned) {
            this.statusCode = 403;
            this.response = {
                error: 'User is banned',
                unbanDate: user.unbanDate,
            }
            return;
        }

        const currentAccessTokenPayload = {...accessTokenPayload};
        const newAccessTokenPayload = Object.assign(currentAccessTokenPayload, {
            user: {
                id: user.id,
                username: user.username,
                plan: user.plan,
                role: user.role,
            }
        });

        const refreshTokenLifetime = requestBody.stayLoggedIn ? AuthController.REFRESH_TOKEN_LIFETIME_STAY_LOGGED_IN : AuthController.REFRESH_TOKEN_LIFETIME;

        const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, newAccessTokenPayload);
        const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, newAccessTokenPayload, refreshTokenLifetime);

        const refreshTokenExpirationDate = new Date();
        refreshTokenExpirationDate.setTime(refreshTokenExpirationDate.getTime() + (refreshTokenLifetime * 1000));

        await this.saveRefreshToken(newRefreshToken, refreshTokenExpirationDate, user.id);

        this.response = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }

    actionLogout = async (accessTokenPayload) => {
        console.log(accessTokenPayload);

        if(!accessTokenPayload.hasOwnProperty('user')) {
            this.statusCode = 400;
            this.response = {
                error: 'User is not logged in',
            };
        }

        if(accessTokenPayload.user.hasOwnProperty('id')) {
            await this.invalidateUserRefreshTokens(accessTokenPayload.user.id);
        }

        this.statusCode = 204;
    }

    actionRegister = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['username', 'email', 'password', 'confirmPassword', 'stayLoggedIn'];
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

        const errors = {};

        const existingUserWithUsername = await db.User.findOne({
            where: {
                username: requestBody.username,
            },
        });

        if (existingUserWithUsername !== null) {
            errors.username = "Ce nom d'utilisateur est déjà utilisé";
        } else if (!requestBody.username.match("^[a-zA-Z0-9_]*$")) {
            errors.username = "Votre nom d'utilisateur ne peut contenir que des caractères alphanumériques et des underscores '_'";
        } else if (requestBody.username.length > 30) {
            errors.username = "Votre nom d'utilisateur doit faire maximum 30 caractères";
        }

        const existingUserWithEmail = await db.User.findOne({
            where: {
                email: requestBody.email,
            },
        });

        if (existingUserWithEmail !== null) {
            errors.email = "Cette adresse email est déjà utilisée";
        } else if(!EmailUtil.isEmailAddressValid(requestBody.email)) {
            errors.email = "Cette adresse email n'est pas valide";
        }

        if (requestBody.password.length < PasswordUtil.MIN_LENGTH) {
            errors.password = `Le mot de passe doit faire au moins ${PasswordUtil.MIN_LENGTH} caractères`;
        }

        if (requestBody.password !== requestBody.confirmPassword) {
            errors.confirmPassword = 'Les champs de mot de passe ne correspondent pas';
        }

        if (Object.keys(errors).length > 0) {
            this.statusCode = 422;
            this.response = {
                errors,
            };
            return;
        }

        const user = await db.User.create({
            username: requestBody.username,
            email: requestBody.email,
            password: await PasswordUtil.hashPassword(requestBody.password),
            plan: 'free',
            role: 'member',
            isTrustyWriter: false,
            isActive: true,
            isBanned: false,
        });

        const currentAccessTokenPayload = {...accessTokenPayload};
        const newAccessTokenPayload = Object.assign(currentAccessTokenPayload, {
            user: {
                id: user.id,
                username: user.username,
                plan: user.plan,
                role: user.role,
            }
        });

        const refreshTokenLifetime = requestBody.stayLoggedIn ? AuthController.REFRESH_TOKEN_LIFETIME_STAY_LOGGED_IN : AuthController.REFRESH_TOKEN_LIFETIME;

        console.log(refreshTokenLifetime, requestBody.stayLoggedIn);

        const newAccessToken = this.generateToken(AuthController.TOKEN_TYPE_ACCESS_TOKEN, newAccessTokenPayload);
        const newRefreshToken = this.generateToken(AuthController.TOKEN_TYPE_REFRESH_TOKEN, newAccessTokenPayload, refreshTokenLifetime);

        const refreshTokenExpirationDate = new Date();
        refreshTokenExpirationDate.setTime(refreshTokenExpirationDate.getTime() + (refreshTokenLifetime * 1000));

        await this.saveRefreshToken(newRefreshToken, refreshTokenExpirationDate, user.id);

        this.sendWelcomeEmailToUser(user); // No await because it doesn't have to be synchronous

        this.statusCode = 201;

        this.response = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }

    actionForgotPassword = async (requestBody) => {
        const requiredBodyFields = ['username']; // We have only one field for this form, but we keep consistency with other actions
        const missingFields = [];
        const badCredentialsResponse = {
            error: 'The provided username or email address do not correspond to any user',
        }

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
                ]
            }
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = badCredentialsResponse;
            return;
        }

        const lastResetPasswordEmailSendDate = user.lastResetPasswordEmailSendDate;

        console.log(lastResetPasswordEmailSendDate);

        const now = new Date();

        if(lastResetPasswordEmailSendDate !== null) {
            const diffSeconds = (now.getTime() - user.lastResetPasswordEmailSendDate.getTime()) / 1000;

            if(diffSeconds < 300) {
                const minutesToWait = Math.ceil((300 - diffSeconds) / 60);

                this.statusCode = 429;
                this.response = {
                    minutesToWait
                };

                return;
            }
        }

        user.lastResetPasswordEmailSendDate = now;
        user.passwordResetToken = RandomUtil.getRandomString(RandomUtil.RANDOM_ALPHANUMERIC_ALL_CASE, 128);
        await user.save();

        await this.sendResetPasswordEmailToUser(user);
    }

    actionPasswordResetTokenExists = async (requestParams) => {
        const requiredBodyFields = ['passwordResetToken']; // We have only one field for this form, but we keep consistency with other actions
        const missingFields = [];
        const badCredentialsResponse = {
            error: 'This token does not exist',
        }

        for(const requiredField of requiredBodyFields) {
            if(!requestParams.hasOwnProperty(requiredField)) {
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
                passwordResetToken: requestParams.passwordResetToken,
            }
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = badCredentialsResponse;
            return;
        }

        this.statusCode = 204;
    }

    actionResetPassword = async (requestBody) => {
        const requiredBodyFields = ['newPassword', 'confirmNewPassword', 'passwordResetToken']; // We have only one field for this form, but we keep consistency with other actions
        const missingFields = [];
        const badCredentialsResponse = {
            error: 'This token does not exist',
        }

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
                passwordResetToken: requestBody.passwordResetToken,
            }
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = badCredentialsResponse;
            return;
        }

        if(requestBody.newPassword !== requestBody.confirmNewPassword) {
            this.statusCode = 422;
            this.response = {
                errors: {
                    confirmNewPassword: 'Les champs de nouveau mot de passe ne correspondent pas',
                },
            };
            return;
        }

        if(requestBody.newPassword.length < PasswordUtil.MIN_LENGTH) {
            this.statusCode = 422;
            this.response = {
                errors: {
                    newPassword: `Le nouveau mot de passe doit faire au moins ${PasswordUtil.MIN_LENGTH} caractères`,
                },
            };
            return;
        }

        user.password = await PasswordUtil.hashPassword(requestBody.newPassword);
        user.passwordResetToken = null;
        await user.save();

        this.statusCode = 204;
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
     * @param forceLifetime if set, it will be the token lifetime. Otherwise, the lifetime will be a default value depending on the token type
     * @returns {string}
     */
    generateToken = (type, initialPayload = {}, forceLifetime = null) => {
        let expiresIn;
        if(forceLifetime) {
            expiresIn = forceLifetime;
        } else {
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
        }

        const payload = {...initialPayload};
        delete payload.iat;
        delete payload.exp;
        delete payload.type;
        delete payload.slt;

        payload.type = type;
        payload.slt = RandomUtil.getRandomString(RandomUtil.RANDOM_ALPHANUMERIC_ALL_CASE, 64); // A salt added in token payload to make it unique

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

    invalidateUserRefreshTokens = async (userId) => {
        await db.sequelize.query(
            'DELETE from "refresh_token" WHERE "userId" = :userId',
            {
                replacements: {
                    userId,
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

    // TODO move send email functions in EmailUtil or in dedicated class

    sendWelcomeEmailToUser = async (user) => {
        await EmailUtil.sendEmailFromNoreply({
            to: `"${user.username}" <${user.email}>`,
            subject: 'Bienvenue sur leQuiz.io !',
            html:
`
<p>Texte à définir</p>
`,
            text:
`Texte à définir`,
        });
    }

    sendResetPasswordEmailToUser = async (user) => {
        await EmailUtil.sendEmailFromNoreply({
            to: `"${user.username}" <${user.email}>`,
            subject: 'Réinitialisez votre mot de passe',
            html:
`<p>
    Bonjour ${user.username},<br>
    Vous avez demandé la réinitialisation du mot de passe de votre compte LeQuiz.io.
    Pour définir un nouveau mot de passe, veuillez
    <strong><a href="${env.frontUrl}/reset-password/${user.passwordResetToken}" target="_blank">cliquer ici</a></strong>.
</p>
<p>
    Si vous n'êtes pas à l'origine de la demande de réinitialisation de mot de passe, veuillez ignorer ce message.
</p>
<p>
    Cordialement,<br>
    L'équipe LeQuiz.io
</p>`,
            text:
`Bonjour ${user.username},
Vous avez demandé la réinitialisation du mot de passe de votre compte LeQuiz.io.
Pour définir un nouveau mot de passe, veuillez suivre le lien ci-dessous :

${env.frontUrl}/reset-password/${user.passwordResetToken}

Si vous n'êtes pas à l'origine de la demande de réinitialisation de mot de passe, veuillez ignorer ce message.

Cordialement,
L'équipe LeQuiz.io`,
        });
    }
}

module.exports = AuthController;
