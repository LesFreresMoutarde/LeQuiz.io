import * as url from "url";

class Util {


    static getParam = (paramName, defaultValue, type) => {
        const queryString = window.location.search;

        if (!queryString) return defaultValue

        const searchParams = new URLSearchParams(queryString)

        const param = searchParams.get(paramName);

        if (!param) return defaultValue

        if (type === 'number' && isNaN(parseInt(param))) return defaultValue;

        return param;
    }

    static addParam = (paramName, paramValue) => {
        const queryString = window.location.search;

        const searchParams = new URLSearchParams(queryString);

        searchParams.set(paramName, paramValue);

        return `${window.location.href.split('?')[0]}?${decodeURIComponent(searchParams.toString())}`;
    }

    static deleteParam = (paramName) => {
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.delete(paramName);

        let separator = '?'

        if (searchParams.toString() === '') separator = ''

        return `${window.location.href.split('?')[0]}${separator}${searchParams.toString()}`;
    }

    static getFilteredData = async (route, param) => {

        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');

        let urlToFetch = `/${route}`;
        console.log("param...", param);

        if (param) {
            urlToFetch += '?'

            for (const paramName in param) {
                if (param.hasOwnProperty(paramName))
                    urlToFetch += `${paramName}=${param[paramName]}&`;
            }
            urlToFetch = urlToFetch.slice(0, urlToFetch.length -1);
        }

        console.log("final URL To Fetch", urlToFetch);

        const response = await fetch(urlToFetch, {headers});
        //
        if (!response.ok) throw new Error();
        // console.log("tt")
        return await response.text();
        // console.log('dd')
        // return responseData;
    }
}

export default Util;
