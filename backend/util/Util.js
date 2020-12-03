const argon2 = require('argon2');

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
}

module.exports = Util;
