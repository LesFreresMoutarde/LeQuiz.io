const argon2 = require('argon2');

class PasswordUtil {
    static MIN_LENGTH = 8;

    static hashPassword = async (rawPassword) => {
        return await argon2.hash(rawPassword, {
            type: argon2.argon2id,
            memoryCost: 16,
            timeCost: 3,
        });
    }
}

module.exports = PasswordUtil;
