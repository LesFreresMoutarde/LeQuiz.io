const MainController = require('./mainController/MainController');
const EmailUtil = require("../util/EmailUtil");
const InvalidEmailError = require("../errors/auth/email/InvalidEmailError");
const EmptyBodyError = require("../errors/misc/EmptyBodyError");
const FormData = require("form-data");
const env = require("../config/env");
const fetch = require("node-fetch");

class UserController extends MainController {

    actionContact = async ({username, email, subject, message}) => {
        if (!EmailUtil.isEmailAddressValid(email)) throw new InvalidEmailError();

        // TODO check username, subject & message max length
        if (subject === '' || message === '' || username === '') throw new EmptyBodyError();

        const url = `${env.privateApiUrl}/receive-contact-form-message`;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        await fetch (url, {
            method: 'POST',
            body: formData,
        });
    }

    actionFeedback = async ({subject, message}) => {
        if (message === '') throw new EmptyBodyError();

        const url = `${env.privateApiUrl}/receive-feedback-message`;

        const formData = new FormData();

        if (subject) {
            formData.append('subject', subject);
        }

        formData.append('message', message);

        await fetch (url, {
            method: 'POST',
            body: formData,
        });
    }
}

module.exports = UserController;
