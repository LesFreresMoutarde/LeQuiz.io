const argon2 = require('argon2');
const MainController = require('./mainController/MainController');

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

        // await user.setEmail(requestBody.newEmail);
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
}

module.exports = SettingsController;
