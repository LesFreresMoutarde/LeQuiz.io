const argon2 = require('argon2');
const MainController = require('./mainController/MainController');
const PasswordUtil = require("../util/PasswordUtil");
const UserNotFoundByTokenError = require("../errors/auth/token/UserNotFoundByTokenError");
const MissingParametersError = require("../errors/misc/MissingParametersError");
const IncorrectPasswordError = require("../errors/auth/password/IncorrectPasswordError");
const AlreadyUsedEmailError = require("../errors/auth/email/AlreadyUsedEmailError");
const InvalidEmailError = require("../errors/auth/email/InvalidEmailError");
const DatabaseError = require("../errors/misc/DatabaseError");
const NotMatchingPasswordsError = require("../errors/auth/password/NotMatchingPasswordsError");
const NewPasswordIdenticalToPreviousError = require("../errors/auth/password/NewPasswordIdenticalToPreviousError");
const TooShortPasswordError = require("../errors/auth/password/TooShortPasswordError");

class SettingsController extends MainController {
    actionGetEmail = async (accessTokenPayload) => {
        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if (user === null) throw new UserNotFoundByTokenError();

        this.response = {
            email: user.email,
        };
    }

    //TODO REFACTO
    actionEditEmail = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['newEmail', 'password'];
        const missingFields = [];

        for(const requiredField of requiredBodyFields) {
            if(!requestBody.hasOwnProperty(requiredField)) {
                missingFields.push(requiredField);
            }
        }

        if (missingFields.length > 0) throw new MissingParametersError(missingFields.join(', '))

        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if (user === null) throw new UserNotFoundByTokenError();

        const userPasswordHash = user.password;

        if (!(await argon2.verify(userPasswordHash, requestBody.password)))
            throw new IncorrectPasswordError()

        const existingUserWithNewEmail = await db.User.findOne({
            where: {
                email: requestBody.newEmail,
            }
        });

        if (existingUserWithNewEmail !== null) throw new AlreadyUsedEmailError();

        try {
            user.email = requestBody.newEmail;
            await user.save();
        } catch(e) {
            switch(e.constructor.name) {
                case 'ValidationError':
                    throw new InvalidEmailError();
                default:
                    throw new DatabaseError();
            }
        }

        this.response = {
            email: user.email,
        };
    }

    //TODO REFACTO
    actionEditPassword = async (requestBody, accessTokenPayload) => {
        const requiredBodyFields = ['currentPassword', 'newPassword', 'confirmNewPassword'];
        const missingFields = [];

        for(const requiredField of requiredBodyFields) {
            if(!requestBody.hasOwnProperty(requiredField)) {
                missingFields.push(requiredField);
            }
        }

        if (missingFields.length > 0) throw new MissingParametersError(missingFields.join(', '))

        const userId = accessTokenPayload.user.id;

        const user = await db.User.findOne({
            where: {
                id: userId,
            }
        });

        if (user === null) throw new UserNotFoundByTokenError();

        const userPasswordHash = user.password;

        if (!(await argon2.verify(userPasswordHash, requestBody.password)))
            throw new IncorrectPasswordError()

        if (requestBody.newPassword !== requestBody.confirmNewPassword) throw new NotMatchingPasswordsError();

        if (requestBody.currentPassword === requestBody.newPassword) throw new NewPasswordIdenticalToPreviousError();

        if(requestBody.newPassword.length < PasswordUtil.MIN_LENGTH) throw new TooShortPasswordError();

        user.password = await PasswordUtil.hashPassword(requestBody.newPassword);

        try {
            await user.save();
            this.statusCode = 204;
        } catch (error) {
            throw new DatabaseError();
        }


    }
}

module.exports = SettingsController;
