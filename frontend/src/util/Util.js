import App from "../components/App";
import env from "../config/env";
import AuthUtil from "./AuthUtil";
import ApiUtil from "./ApiUtil";

class Util {
    static isVerbose = true; // TODO env

    static bgColors = ['red-pink-bg', 'brown-bg', 'deep-blue-bg', 'yellow-bg', 'green-bg'];

    static UserAccess = {
        /**
         * @enum {string}
         */
        ROLES: {
            GUEST_ONLY: 'guestOnly',
            LOGGED_IN: 'loggedIn',
        },

        /**
         * @param {Util.UserAccess.ROLES} role
         * @param {string} redirect The URL to which the user is redirected if he does not have the required role
         * @return {boolean} True if user has access to component, false otherwise
         */
        componentRequiresRole: (role, redirect = '/') => {
            switch(role) {
                case Util.UserAccess.ROLES.GUEST_ONLY:
                    if(App.GLOBAL.state.user) {
                        App.GLOBAL.redirectTo(redirect);
                        return false;
                    }
                    break;
                case Util.UserAccess.ROLES.LOGGED_IN:
                    if(!App.GLOBAL.state.user) {
                        App.GLOBAL.redirectTo(redirect);
                        return false;
                    }
                    break;
                default:
                    throw new Error('Unknown required role');
            }

            return true;
        }
    };

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

    static getRandomColor = () => {
        return Util.bgColors[Math.floor(Math.random() * Util.bgColors.length)];
    }

    static getRandomColors = (nb) => {
        let color = Util.getRandomColor();
        const colorsUsed = [color];
        for (let i = 0; i < nb - 1; i++) {
            while (colorsUsed.includes(color)) {
                color = Util.getRandomColor();
            }
            colorsUsed.push(color)
        }
        return colorsUsed;
    }
}

export default Util;
