class Util {
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
