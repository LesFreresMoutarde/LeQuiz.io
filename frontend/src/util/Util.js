import App from "../components/App";
import env from "../config/env";
import AuthUtil from "./AuthUtil";

class Util {
    static APP_BACKEND_URL = env.apiUrl;

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

    /**
     * Returns true if stored access token is valid, otherwise returns false
     * @returns {Promise<boolean>}
     */
    static getJwtPayloadContent = (jwtToken) => {
        const tokenParts = jwtToken.split('.');
        if(tokenParts.length !== 3) {
            throw new Error('Malformed token');
        }

        const partToDecode = tokenParts[1];
        const decoded = atob(partToDecode);

        return JSON.parse(decoded);
    }

    static getBackendFullUrl = (shortUrl) => {
        if(!shortUrl.startsWith('/')) {
            shortUrl = '/' + shortUrl;
        }

        return Util.APP_BACKEND_URL + shortUrl;
    }

    /**
     * Try to perform a request to the backend API {@see Util.performAPIRequest} JSON-encoded data
     * Default method is POST if not overrided in init object
     * @param url
     * @param data
     * @param init
     * @returns {Promise<Response>}
     */
    static sendJsonToAPI = async (url, data = {}, init = {}) => {
        if(!init.hasOwnProperty('method')) {
            init.method = 'POST';
        }

        if(init.hasOwnProperty('headers')) {
            if(!(init.headers instanceof Headers)) {
                // The headers received in function param should be an object containing the HTTP headers,
                // or an instance of
                init.headers = new Headers(init.headers);
            }
        } else {
            init.headers = new Headers();
        }

        init.headers.set('Content-Type', 'application/json');

        init.body = JSON.stringify(data);

        return await Util.performAPIRequest(url, init);
    }

    /**
     * Try to perform a request to the backend API with the access token in Authorization header.
     * If the request results in a 401 Unauthorized response, the access token is refreshed and then the same request is re-sent.
     * @param url {string}
     * @param init {object|Headers} If set, the Authorization header will be overrided
     * @returns {Promise<Response>}
     * TODO try/catch, in case of error log it and return nothing ?
     */
    static performAPIRequest = async (url, init = {}) => {
        if(!url.startsWith(Util.APP_BACKEND_URL)) {
            url = Util.getBackendFullUrl(url);
        }

        if(init.hasOwnProperty('headers')) {
            if(!(init.headers instanceof Headers)) {
                // The headers received in function param should be an object containing the HTTP headers,
                // or an instance of
                init.headers = new Headers(init.headers);
            }
        } else {
            init.headers = new Headers();
        }

        init.headers.set('Authorization', AuthUtil.accessToken);

        let response = await Util.fetch(url, init);

        if(response.status !== 401) {
            return response;
        }

        Util.verbose(`API request to ${url} resulted in 401 Unauthorized response, refreshing access token before retry`);

        if(!(await AuthUtil.refreshAccessToken())) {
            throw new Error('Unable to refresh access token'); // TODO log error and return nothing ?
        }

        init.headers.set('Authorization', AuthUtil.accessToken);

        Util.verbose(`Performing API request to ${url}`);

        response = await Util.fetch(url, init);

        Util.verbose(`API request to ${url} response`, response.status);

        return response;
    }

    /**
     * Fetch minimal verbose wrapper
     * @param url
     * @param init
     * @returns {Promise<Response>}
     */
    static fetch = async (url, init) => {
        let method = 'GET';
        if(init.hasOwnProperty('method')) {
            method = init.method.toUpperCase();
        }

        Util.verbose(`Performing request ${method} ${url}`);

        const response = await fetch(url, init);

        Util.verbose(`${method} ${url} response code:`, response.status);

        return response;
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
