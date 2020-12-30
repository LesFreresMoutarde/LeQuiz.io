const argon2 = require('argon2');
const sendgrid = require('@sendgrid/mail');
const env = require('../config/env');

sendgrid.setApiKey(env.email.apiKey);

class Util {
    static Password = {
        MIN_LENGTH: 8,

        hashPassword: async (rawPassword) => {
            return await argon2.hash(rawPassword, {
                type: argon2.argon2id,
                memoryCost: 16,
            });
        }
    };

    static Email = {
        FROM_NAME: 'LeQuiz.io',
        FROM_NOREPLY_ADDRESS: 'noreply@lequiz.io',

        sendEmail: async(message = {}) => {
            await sendgrid.send(message);
        },

        sendEmailFromNoreply: async(message = {}) => {
            message.from = {
                email: Util.Email.FROM_NOREPLY_ADDRESS,
                name: Util.Email.FROM_NAME,
            }

            Util.Email.sendEmail(message);
        },
    }
}

module.exports = Util;
