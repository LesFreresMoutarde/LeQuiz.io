const argon2 = require('argon2');
const MainController = require('./mainController/MainController');
const Util = require('../util/Util');

class SettingsController extends MainController {
    actionGetEmail = async (accessTokenPayload) => {
        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if(user === null) {
            this.statusCode = 400;
            this.response = {
                error: 'User not found',
            }
            return;
        }

        this.response = {
            email: user.email,
        };
    }

    actionEditEmail = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['newEmail', 'password'];
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

        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = {
                error: 'User not found',
            };
            return;
        }

        const userPasswordHash = user.password;

        if(!(await argon2.verify(userPasswordHash, requestBody.password))) {
            this.statusCode = 401;
            this.response = {
                errors: {
                    password: 'Mot de passe incorrect',
                },
            };
            return;
        }

        const existingUserWithNewEmail = await db.User.findOne({
            where: {
                email: requestBody.newEmail,
            }
        });

        if(existingUserWithNewEmail !== null) {
            this.statusCode = 422;
            this.response = {
                errors: {
                    newEmail: "Cette adresse email est déjà utilisée",
                },
            };
            return;
        }

        try {
            user.email = requestBody.newEmail;
            await user.save();
        } catch(e) {
            switch(e.constructor.name) {
                case 'ValidationError':
                    this.statusCode = 422;
                    this.response = {
                        errors: {
                            newEmail: 'Cette adresse email est invalide',
                        },
                    };
                    return;
                default:
                    throw e;
            }
        }

        this.response = {
            email: user.email,
        };
    }

    actionEditPassword = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['currentPassword', 'newPassword', 'confirmNewPassword'];
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

        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if(user === null) {
            this.statusCode = 404;
            this.response = {
                error: 'User not found',
            };
            return;
        }

        const userPasswordHash = user.password;

        if(!(await argon2.verify(userPasswordHash, requestBody.currentPassword))) {
            this.statusCode = 401;
            this.response = {
                errors: {
                    password: 'Mot de passe incorrect',
                },
            };
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

        if(requestBody.currentPassword === requestBody.newPassword) {
            this.statusCode = 422;
            this.response = {
                errors: {
                    newPassword: 'Le nouveau mot de passe est identique au mot de passe actuel',
                },
            };
        }

        if(requestBody.newPassword.length < Util.Password.MIN_LENGTH) {
            this.statusCode = 422;
            this.response = {
                errors: {
                    newPassword: `Le nouveau mot de passe doit faire au moins ${Util.Password.MIN_LENGTH} caractères`,
                },
            };
            return;
        }

        user.password = await Util.Password.hashPassword(requestBody.newPassword);
        await user.save();

        this.statusCode = 204;
    }
}

module.exports = SettingsController;
