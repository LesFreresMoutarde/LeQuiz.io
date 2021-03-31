const nodemailer = require('nodemailer');
const env = require('../config/env');

class EmailUtil {
    static FROM_NAME = 'LeQuiz.io';
    static FROM_NOREPLY_ADDRESS = 'noreply@lequiz.io';

    static transport = null; // Initialized by createTransport function

    static createTransport = () => {
        const transport = nodemailer.createTransport(env.email);

        console.log('Verifying email transport');
        transport.verify((error, success) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log('Email transport is ready');
            }
        });

        return transport;
    }

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

    /**
     * @param {object} message The message options
     * @param {string} message.from The sender
     * @param {string} message.to The recipients, comma-separated
     * @param {string} message.subject The email subject
     * @param {string} message.text The email text content
     * @param {string} message.html The email html content
     * @param message
     * @return {Promise}
     * @throws {Error} if the email cannot be sent
     */
    static sendEmail = (message = {}) => {
        return EmailUtil.transport.sendMail(message);
    }

    /**
     *
     * @param {object} message The message options
     * @param {string} message.to The recipients, comma-separated
     * @param {string} message.subject The email subject
     * @param {string} message.text The email text content
     * @param {string} message.html The email html content
     * @returns {Promise}
     */
    static sendEmailFromNoreply = async (message = {}) => {
        message.from = `"${EmailUtil.FROM_NAME}" <${EmailUtil.FROM_NOREPLY_ADDRESS}>`;

        return await EmailUtil.sendEmail(message);
    }
}

EmailUtil.transport = EmailUtil.createTransport();

module.exports = EmailUtil;
