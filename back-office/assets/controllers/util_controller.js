import {validate} from "uuid";

class Util {


    static getQueryStringParam = (paramName, defaultValue, type) => {

        const queryString = window.location.search;

        if (!queryString) return defaultValue

        const searchParams = new URLSearchParams(queryString)

        const param = searchParams.get(paramName);

        if (!param) return defaultValue

        if (type === 'number' && isNaN(parseInt(param))) return defaultValue;

        return param;
    }

    static getQueryStringParams = () => {

        const queryString = window.location.search;

        if (!queryString) return null;

        const params = {};

        const searchParams = new URLSearchParams(queryString);

        for (const [paramName, paramValue] of searchParams.entries()) {
            params[paramName] = paramValue;
        }

        return params;
    }

    static addQueryStringParam = (paramName, paramValue) => {

        const queryString = window.location.search;

        const searchParams = new URLSearchParams(queryString);

        searchParams.set(paramName, paramValue);

        return `${window.location.href.split('?')[0]}?${decodeURIComponent(searchParams.toString())}`;
    }

    static deleteQueryStringParam = (paramName) => {

        if (typeof paramName === 'string') paramName = [paramName];

        const searchParams = new URLSearchParams(window.location.search);

        paramName.forEach(param => {
            searchParams.delete(param);
        })

        const separator = searchParams.toString() === '' ? '' : '?';

        return `${window.location.href.split('?')[0]}${separator}${decodeURIComponent(searchParams.toString())}`;
    }

    static getFilteredData = async (route, param) => {

        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');

        let urlToFetch = `/${route}`;

        if (param) {
            urlToFetch += '?'

            for (const paramName in param) {
                if (param.hasOwnProperty(paramName))
                    urlToFetch += `${paramName}=${param[paramName]}&`;
            }
            urlToFetch = urlToFetch.slice(0, urlToFetch.length -1);
        }

        const response = await fetch(urlToFetch, {headers});

        if (!response.ok) throw new Error();

        return await response.text();

    }

    static isUuidValid = (uuid) => {
        return validate(uuid);
    }
}

export default Util;
