import Util from "./Util";
import ApiUtil from "./ApiUtil";

class AuthUtil {
    static accessToken = null;
    static refreshToken = null;

    static accessTokenPayload = null;
    static refreshTokenPayload = null;

    static getNewAccessToken = async() => {
        Util.verbose('Getting new access token');

        const response = await fetch(ApiUtil.getBackendFullUrl('/auth/access-token'));

        const responseJson = await response.json();
        Util.verbose('New access token generation response', response.status, responseJson);
        AuthUtil.setAccesstoken(responseJson.accessToken);
        AuthUtil.setRefreshToken(responseJson.refreshToken);
    };

    /**
     * Removes the accessToken and refreshToken from localStorage to hide it,
     * and adds event to re-set tokens in localStorage before page unload.
     * This function is called at the very beginning when the application is loaded.
     */
    static initializeTokensStorage = () => {
        const localStorageAccessToken = localStorage.getItem('accessToken');
        const localStorageRefreshToken = localStorage.getItem('refreshToken');

        if(localStorageAccessToken !== null) {
            AuthUtil.setAccesstoken(localStorageAccessToken);
        }

        if(localStorageRefreshToken !== null) {
            AuthUtil.setRefreshToken(localStorageRefreshToken);
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.addEventListener('beforeunload', () => {
            if(AuthUtil.accessToken !== null) {
                localStorage.setItem('accessToken', AuthUtil.accessToken);
            }

            if(AuthUtil.refreshToken !== null) {
                localStorage.setItem('refreshToken', AuthUtil.refreshToken);
            }
        })
    };

    static refreshAccessToken = async() => {
        Util.verbose('Getting new access token from refresh token');

        const response = await fetch(ApiUtil.getBackendFullUrl(`/auth/access-token?refreshToken=${AuthUtil.refreshToken}`));

        const responseJson = await response.json();
        Util.verbose('Refresh access token response', response.status, responseJson);

        if(response.status === 200) {
            AuthUtil.setAccesstoken(responseJson.accessToken);
            AuthUtil.setRefreshToken(responseJson.refreshToken);

            return true;
        }

        Util.verbose('Refresh access token failed');
        return false;
    };

    static setAccesstoken = (token) => {
        AuthUtil.accessToken = token;
        AuthUtil.accessTokenPayload = Util.getJwtPayloadContent(token);
    };

    static setRefreshToken = (token) => {
        AuthUtil.refreshToken = token;
        AuthUtil.refreshTokenPayload = Util.getJwtPayloadContent(token);
    };

    /**
     * Returns true if stored access token is valid, otherwise returns false
     * @returns {Promise<boolean>}
     */
    static verifyAccessToken = async () => {
        Util.verbose('Verifying stored access token');
        const response = await fetch(ApiUtil.getBackendFullUrl('/auth/verify-token'), {
            headers: new Headers({
                'Authorization': AuthUtil.accessToken
            }),
        });

        const responseJson = await response.json();

        Util.verbose('Access token verification response', response.status, responseJson);

        Util.verbose(responseJson.valid ? 'Access token is valid' : `Access token is not valid: ${responseJson.error}`);

        return responseJson.valid === true;
    };
}

export default AuthUtil;
