const argon2 = require('argon2');
const nodemailer = require('nodemailer');
// const sendgrid = require('@sendgrid/mail');
const env = require('../config/env');

// sendgrid.setApiKey(env.email.apiKey);

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

        transport: nodemailer.createTransport({
            host: env.email.host,
            port: env.email.port,
            auth: {
                user: env.email.user,
                pass: env.email.password,
            },
        }),

        /**
         * @param {string} email
         * @return {boolean}
         */
        isEmailAddressValid: (email) => {
            if(email.length > 191) {
                return false;
            }

            const regex = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
            return !!email.match(regex);
        },

        /**
         * @param {object} message The message options
         * @param {string} message.from The sender
         * @param {string} message.to The recipients, comma-separated
         * @param {string} message.subject The email subject
         * @param {string} message.text The email text content
         * @param {string} message.html The email html content
         * @param message
         * @return {Promise}
         */
        sendEmail: (message = {}) => {
            return new Promise((resolve, reject) => {
                Util.Email.transport.sendMail(message, (error, info) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(info);
                });
            });

            // await sendgrid.send(message);
        },

        /**
         *
         * @param {object} message The message options
         * @param {string} message.to The recipients, comma-separated
         * @param {string} message.subject The email subject
         * @param {string} message.text The email text content
         * @param {string} message.html The email html content
         * @returns {Promise}
         */
        sendEmailFromNoreply: async(message = {}) => {
            message.from = {
                email: Util.Email.FROM_NOREPLY_ADDRESS,
                name: Util.Email.FROM_NAME,
            }

            return await Util.Email.sendEmail(message);
        },
    };

    static Random = {

        getRandomString: (characters = Util.Random.RANDOM_ALPHANUMERIC_ALL_CASE, length = 32) => {
            // We don't use an empty string populated with "+=" in the for loop because it have O(n^2) performance.
            // Creating a characters array and join them at the end is better.

            const outputCharacters = [];

            for(let i = 0; i < length; ++i) {
                outputCharacters.push(characters.charAt(Math.floor(Math.random() * characters.length)));
            }

            return outputCharacters.join('');
        },
    };
}

Util.Random.RANDOM_LETTERS_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
Util.Random.RANDOM_LETTERS_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
Util.Random.RANDOM_LETTERS_ALL_CASE = Util.Random.RANDOM_LETTERS_LOWERCASE + Util.Random.RANDOM_LETTERS_UPPERCASE;
Util.Random.RANDOM_DIGITS = '0123456789';
Util.Random.RANDOM_ALPHANUMERIC_ALL_CASE = Util.Random.RANDOM_LETTERS_ALL_CASE + Util.Random.RANDOM_DIGITS;


module.exports = Util;
