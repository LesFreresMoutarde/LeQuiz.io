
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

    static getFilteredData = async (route, searchValue) => {

        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');

        if (!searchValue) return;

        const response = await fetch(`/${route}?search=${searchValue}`, {headers});

        if (!response.ok) throw new Error();

        return await response.text();
    }
}

export default Util;
