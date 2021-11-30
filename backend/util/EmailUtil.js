const env = require('../config/env');

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
}

module.exports = EmailUtil;
