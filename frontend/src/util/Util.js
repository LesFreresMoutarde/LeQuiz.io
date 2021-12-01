import AuthUtil from "./AuthUtil";

class Util {
    static isVerbose = process.env.NODE_ENV !== 'production';

    static verbose = (...items) => {
        if(!Util.isVerbose) {
            return;
        }
        console.log('%c[v]', 'color: orange', ...items);
    };

    /**
     * Removes the accessToken and refreshToken from localStorage to hide it,
     * and adds event to re-set tokens in localStorage before page unload.
     * This function is called at the very beginning when the application is loaded.
     */
    static onApplicationLoad = async () => {
        Util.verbose('Application load');
        Util.verbose('Access token', AuthUtil.accessToken);
        Util.verbose('Refresh token', AuthUtil.refreshToken);

        if(AuthUtil.accessToken === null || !(await AuthUtil.verifyAccessToken())) {
            if(AuthUtil.refreshToken !== null) {
                if(!(await AuthUtil.refreshAccessToken())) {
                    await AuthUtil.getNewAccessToken();
                }
            } else {
                await AuthUtil.getNewAccessToken();
            }
        }

        Util.verbose('Access token payload', AuthUtil.accessTokenPayload);
        Util.verbose('Refresh token payload', AuthUtil.refreshTokenPayload);
    };

    static getJwtPayloadContent = (jwtToken) => {
        const tokenParts = jwtToken.split('.');
        if(tokenParts.length !== 3) {
            throw new Error('Malformed token');
        }

        const partToDecode = tokenParts[1];
        const decoded = atob(partToDecode);

        return JSON.parse(decoded);
    }

    static addObjectToLocalStorage = (key, object) => {
        localStorage.setItem(key, JSON.stringify(object));
    };

    static addObjectToSessionStorage = (key, object) => {
        sessionStorage.setItem(key, JSON.stringify(object));
    };

    static clearSessionStorage = () => {
        sessionStorage.clear();
    };

    static getObjectFromLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    };

    static getObjectFromSessionStorage = (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    }

    static randomizeArray = (array) => {
        for (let i = array.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}

export default Util;
