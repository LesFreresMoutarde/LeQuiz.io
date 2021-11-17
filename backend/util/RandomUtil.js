class RandomUtil {
    static RANDOM_LETTERS_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    static RANDOM_LETTERS_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static RANDOM_LETTERS_ALL_CASE = RandomUtil.RANDOM_LETTERS_LOWERCASE + RandomUtil.RANDOM_LETTERS_UPPERCASE;
    static RANDOM_DIGITS = '0123456789';
    static RANDOM_ALPHANUMERIC_ALL_CASE = RandomUtil.RANDOM_LETTERS_ALL_CASE + RandomUtil.RANDOM_DIGITS;

    static getRandomString = (characters = RandomUtil.RANDOM_ALPHANUMERIC_ALL_CASE, length = 32) => {
        // We don't use an empty string populated with "+=" in the for loop because it have O(n^2) performance.
        // Creating a characters array and join them at the end is better.

        const outputCharacters = [];

        for(let i = 0; i < length; ++i) {
            outputCharacters.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }

        return outputCharacters.join('');
    }

    static getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

}

module.exports = RandomUtil;
