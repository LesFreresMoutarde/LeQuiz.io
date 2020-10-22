class Util {
    static isVerbose = true; // TODO env

    static accessToken = null;
    static refreshToken = null;

    static accessTokenPayload = null;
    static refreshTokenPayload = null;

    static verbose = (...items) => {
        if(!Util.isVerbose) {
            return;
        }
        console.log('%c[v]', 'color: orange', ...items);
    }

    /**
     * Removes the accessToken and refreshToken from localStorage to hide it,
     * and adds event to re-set tokens in localStorage before page unload.
     * This function is called at the very beginning when the application is loaded.
     */
    static initializeTokensStorage = () => {
        const localStorageAccessToken = localStorage.getItem('accessToken');
        const localStorageRefreshToken = localStorage.getItem('refreshToken');

        if(localStorageAccessToken !== null) {
            Util.setAccesstoken(localStorageAccessToken);
        }

        if(localStorageRefreshToken !== null) {
            Util.setRefreshToken(localStorageRefreshToken);
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.addEventListener('beforeunload', () => {
            if(Util.accessToken !== null) {
                localStorage.setItem('accessToken', Util.accessToken);
            }

            if(Util.refreshToken !== null) {
                localStorage.setItem('refreshToken', Util.refreshToken);
            }
        })
    }

    static onApplicationLoad = async () => {
        Util.verbose('Application load');
        Util.verbose('Access token', Util.accessToken);
        Util.verbose('Refresh token', Util.refreshToken);

        if(Util.accessToken === null || !(await Util.verifyAccessToken())) {
            if(Util.refreshToken !== null) {
                if(!(await Util.refreshAccessToken())) {
                    await Util.getNewAccessToken();
                }
            } else {
                await Util.getNewAccessToken();
            }
        }

        Util.verbose('Access token payload', Util.accessTokenPayload);
        Util.verbose('Refresh token payload', Util.refreshTokenPayload);
    }

    static getBackendFullUrl = (shortUrl) => {
        if(!shortUrl.startsWith('/')) {
            shortUrl = '/' + shortUrl;
        }

        return Util.APP_BACKEND_URL + shortUrl;
    }

    /**
     * Returns true if stored access token is valid, otherwise returns false
     * @returns {Promise<boolean>}
     */
    static verifyAccessToken = async () => {
        Util.verbose('Verifying stored access token');
        const response = await fetch(Util.getBackendFullUrl('/auth/verify-token'), {
            headers: new Headers({
                'Authorization': Util.accessToken
            }),
        });

        const responseJson = await response.json();

        Util.verbose('Access token verification response', response.status, responseJson);

        if(responseJson.valid && responseJson.type !== 'accessToken') {
            Util.verbose(`Token type ${responseJson.type} is not valid`);
            return false;
        }

        Util.verbose(responseJson.valid ? 'Access token is valid' : `Access token is not valid: ${responseJson.error}`);

        return responseJson.valid === true;
    }

    static getNewAccessToken = async() => {
        Util.verbose('Getting new access token');

        const response = await fetch(Util.getBackendFullUrl('/auth/access-token'));

        const responseJson = await response.json();
        Util.verbose('New access token generation response', response.status, responseJson);
        Util.setAccesstoken(responseJson.accessToken);
        Util.setRefreshToken(responseJson.refreshToken);
    }

    static refreshAccessToken = async() => {
        Util.verbose('Getting new access token from refresh token');

        const response = await fetch(Util.getBackendFullUrl(`/auth/access-token?refreshToken=${Util.refreshToken}`));

        const responseJson = await response.json();
        Util.verbose('Refresh access token response', response.status, responseJson);

        if(response.status === 200) {
            Util.setAccesstoken(responseJson.accessToken);
            Util.setRefreshToken(responseJson.refreshToken);

            return true;
        }

        Util.verbose('Refresh access token failed');
        return false;
    }

    static setAccesstoken = (token) => {
        Util.accessToken = token;
        Util.accessTokenPayload = Util.getJwtPayloadContent(token);
    }

    static setRefreshToken = (token) => {
        Util.refreshToken = token;
        Util.refreshTokenPayload = Util.getJwtPayloadContent(token);
    }

    static getJwtPayloadContent = (jwtToken) => {
        const tokenParts = jwtToken.split('.');
        if(tokenParts.length !== 3) {
            throw new Error('Malformed token');
        }

        const partToDecode = tokenParts[1];
        const decoded = atob(partToDecode);

        return JSON.parse(decoded);
    }
}

Util.APP_BACKEND_URL = "http://localhost:3000"; // TODO ENV

export default Util;