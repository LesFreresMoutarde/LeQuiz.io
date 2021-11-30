const env = require('../config/env');
const FormData = require("form-data");
const fetch = require("node-fetch");

class EmailUtil {
    /**
     * @param {string} email
     * @return {boolean}
     */
    static isEmailAddressValid = (email) => {
        if(email.length > 191) {
            return false;
        }

        const regex = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        return !!email.match(regex);
    }

    static sendResetPasswordEmail = async (email, username, resetPasswordUrl) => {
        const url = `${env.privateApiUrl}/email/send-reset-password-email`;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('resetPasswordUrl', resetPasswordUrl);

        await fetch(url, {
            method: 'POST',
            body: formData,
        });
    }

    static sendWelcomeEmail = async (email, username) => {
        const url = `${env.privateApiUrl}/email/send-welcome-email`;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);

        await fetch(url, {
            method: 'POST',
            body: formData,
        });
    }
}

module.exports = EmailUtil;
