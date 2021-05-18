import * as url from "url";

class Util {


    static getParam = (url, paramName, defaultValue, type) => {

        if (type === 'number') {
           const param = url.includes(`${paramName}=`)
               ?
               parseInt(url.split('?')[1].split('&').filter(param => param.includes(`${paramName}=`))[0].split('=')[1])
               :
               Number(defaultValue);

           if (isNaN(param)) return 1;

           return param
        }

        const param = url.includes(`${paramName}=`)
           ?
           url.split('?')[1].split('&').filter(param => param.includes(`${paramName}=`))[0].split('=')[1]
           :
           defaultValue;

        if (typeof param !== type) return defaultValue;

        return param;
    }

    static hasParam = (url) => {
        if (url.split('?')[1]) return true;

        return false;
    }

    static hasGivenParam = (url, paramName) => {
        if (!Util.hasParam(url)) return false;

        return !!url.split('?')[1].split('&').filter(param => param.includes(`${paramName}=`))[0];
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
