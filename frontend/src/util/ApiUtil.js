import env from "../config/env";
import AuthUtil from "./AuthUtil";
import Util from "./Util";

class ApiUtil {
    static APP_BACKEND_URL = env.apiUrl;

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

    static getBackendFullUrl = (shortUrl) => {
        if(!shortUrl.startsWith('/')) {
            shortUrl = '/' + shortUrl;
        }

        return ApiUtil.APP_BACKEND_URL + shortUrl;
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
            url = ApiUtil.getBackendFullUrl(url);
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

        let response = await ApiUtil.fetch(url, init);

        if(response.status !== 401) {
            return response;
        }

        Util.verbose(`API request to ${url} resulted in 401 Unauthorized response, refreshing access token before retry`);

        if(!(await AuthUtil.refreshAccessToken())) {
            throw new Error('Unable to refresh access token'); // TODO log error and return nothing ?
        }

        init.headers.set('Authorization', AuthUtil.accessToken);

        Util.verbose(`Performing API request to ${url}`);

        response = await ApiUtil.fetch(url, init);

        Util.verbose(`API request to ${url} response`, response.status);

        return response;
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

        return await ApiUtil.performAPIRequest(url, init);
    }
}

export default ApiUtil;
