class Util {
    static accessToken = null;
    static refreshToken = null;

    /**
     * Removes the accessToken and refreshToken from localStorage to hide it,
     * and adds event to re-set tokens in localStorage before page unload.
     * This function is called at the very beginning when the application is loaded.
     */
    static initializeTokensStorage = () => {
        const localStorageAccessToken = localStorage.getItem('accessToken');
        const localStorageRefreshToken = localStorage.getItem('refreshToken');

        if(localStorageAccessToken !== null) {
            Util.accessToken = localStorageAccessToken;
        }

        if(localStorageRefreshToken !== null) {
            Util.refreshToken = localStorageRefreshToken;
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
        console.log('application load');
        console.log(Util.accessToken);

        if(Util.accessToken === null || !(await Util.verifyAccessToken())) {
            // TODO try to refresh with refresh token before creating a new empty token
            Util.getNewAccessToken();
        }
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
        const response = await fetch(Util.getBackendFullUrl('/auth/verify-access-token'), {
            headers: new Headers({
                'Authorization': Util.accessToken
            }),
        });

        return response.status === 200;
    }

    static getNewAccessToken = async() => {
        const response = await fetch(Util.getBackendFullUrl('/auth/access-token'));

        const responseJson = await response.json();
        Util.accessToken = responseJson.accessToken;
    }

    static refreshAccessToken = async() => {
        const response = await fetch(Util.getBackendFullUrl('/auth/access-token'), {
            // TODO
        });

        // TODO
    }
}

Util.APP_BACKEND_URL = "http://localhost:3000"; // TODO ENV

export default Util;