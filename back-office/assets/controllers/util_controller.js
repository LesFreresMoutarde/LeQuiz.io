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

    static onFormInput = (timer, filters, entity, blockToReplaceSelector, evt) => {

        clearTimeout(timer);

        const filter = evt.target.getAttribute('data-input');

        let newUrl;

        filters[filter] = evt.target.value;
        filters[filter]
            ? newUrl = Util.addQueryStringParam(filter, filters[filter])
            : newUrl = Util.deleteQueryStringParam([filter, 'page']);

        window.history.pushState({}, "", newUrl);

        timer = setTimeout(async () => {

            // Database is waiting for a valid uuid, otherwise it crashes.
            if (filter === 'uuid' && !Util.isUuidValid(filters.uuid) && filters.uuid !== '') {
                //TODO TOASTR WHEN BUG RESOLVED
                clearTimeout(timer);
                return;
            }

            const fieldsToSort = Util.buildParam(filters);

            try {

                const filteredData = await Util.getFilteredData(entity, fieldsToSort);

                document.querySelector(blockToReplaceSelector).innerHTML = filteredData;

            } catch (error) {
                //TODO TOASTR WHEN BUG RESOLVED
                console.error('Internal server error');
            } finally {
                Util.deletePageParam();
                clearTimeout(timer);
            }

        },200)
    }

    static onUniqueCheckboxChange = async (filters, entity, blockToReplaceSelector, evt) => {
        const filter = evt.target.getAttribute('data-checkbox');

        filters[filter] = evt.target.checked;

        let newUrl;

        filters[filter]
            ? newUrl = Util.addQueryStringParam(filter, filters[filter])
            : newUrl = Util.deleteQueryStringParam(filter);

        window.history.pushState({}, "", newUrl);

        const fieldsToSort = Util.buildParam(filters);

        try {
            const filteredData = await Util.getFilteredData(entity, fieldsToSort);

            document.querySelector(blockToReplaceSelector).innerHTML = filteredData;

        } catch (error) {
            //TODO TOASTR WHEN BUG RESOLVED
            console.error('Internal server error');
        } finally {
            Util.deletePageParam();
        }

    }

    static onMultiCheckboxesChange = async (filters, entity, blockToReplaceSelector, evt) => {
        const checkboxElts = Util.getFilterCheckboxElements(evt, 'data-checkboxes');

        const checkboxesChecked = Array.from(checkboxElts)
            .filter(checkbox => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const filter = checkboxElts[0].getAttribute('data-checkboxes')

        filters[filter] = Util.handleCheckboxChange(filter, checkboxElts, checkboxesChecked);

        const fieldsParam = Util.buildParam(filters);
        try {
            const filteredData = await Util.getFilteredData(entity, fieldsParam);

            document.querySelector(blockToReplaceSelector).innerHTML = filteredData;
        } catch (error) {
            //TODO TOASTR WHEN BUG RESOLVED
            console.error('Internal server error');
        } finally {
            Util.deletePageParam();
        }
    };

    static getFilterCheckboxElements = (evt, attribute) => {
        const checkboxesFor = evt.target.getAttribute(attribute);

        return document.querySelectorAll(`input[data-checkboxes="${checkboxesFor}"]`);
    }

    static handleCheckboxChange = (filterName, checkboxes, checkboxesChecked) => {

        if (checkboxesChecked.length === 0 || checkboxesChecked.length === checkboxes.length) {
            return Util.addAllToFilter(filterName)
        }

        const newUrl = Util.addQueryStringParam(filterName, checkboxesChecked.join(','))
        window.history.pushState({}, "", newUrl);

        return checkboxesChecked;
    }

    static addAllToFilter = (filterName) => {
        const newUrl = Util.deleteQueryStringParam(filterName);

        window.history.pushState({}, "", newUrl);

        return ['all'];
    }

    static onCheckboxesButtonClick = async (filters, entity, blockToReplaceSelector, evt) => {
        const checkboxElts = Util.getFilterCheckboxElements(evt, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        const value = evt.target.getAttribute('data-pick');

        const checked = {full: true, empty: false};

        checkboxElts.forEach((checkboxElt) => {
            if (checkboxElt.checked !== checked[value]) {
                checkboxElt.checked = checked[value];
                checkboxesChangedCounter++
            }
        });

        if (checkboxesChangedCounter === 0) return;

        const filter = checkboxElts[0].getAttribute('data-checkboxes')

        filters[filter] = Util.addAllToFilter(filter);

        const fieldsParam = Util.buildParam(filters);

        try {
            const filteredData = await Util.getFilteredData(entity, fieldsParam);

            document.querySelector(blockToReplaceSelector).innerHTML = filteredData;
        } catch (error) {
            //TODO TOASTR WHEN BUG RESOLVED
            console.error('Internal server error');
        } finally {
            Util.deletePageParam();
        }
    }

    static buildParam = (filters) => {
        let param = {};

        for (const filter in filters) {
            switch (typeof filters[filter]) {
                case "string":
                case "boolean":
                    if (filters[filter])
                        param[filter] = filters[filter];
                    break;
                case "object":
                    if (filters[filter].length > 0 && filters[filter][0] !== 'all')
                        param[filter] = filters[filter].join(',');
                    break;
            }
        }

        return param
    }

    static deletePageParam = () => {
        const newUrl = Util.deleteQueryStringParam('page');

        window.history.pushState({}, "", newUrl);
    }

    static fillFilterInputs = (params, filters) => {

        if (!params) return;

        delete params['page'];

        let inputElt;

        for (const param in params) {
            switch (typeof filters[param]) {
                case "string":
                case "boolean":

                    filters[param] = params[param];
                    inputElt = document.querySelector(`#${param}-input`);
                    inputElt.type === 'checkbox'
                        ? inputElt.checked = !!filters[param]
                        : inputElt.value = filters[param];
                    break;
                case "object":
                    filters[param] = params[param].split(',');
                    const checkboxes = document.querySelectorAll(`input[data-checkboxes="${param}"]`);
                    checkboxes.forEach(checkbox => {
                        if (filters[param].includes(checkbox.value))
                            checkbox.checked = true;
                    })
                    break;
            }
        }
    }

    static showCheckboxes = (evt) => {
        const checkboxesFor = evt.currentTarget.getAttribute('data-checkboxes-for');

        const checkboxesDivElt = document.querySelector(`#${checkboxesFor}`)

        checkboxesDivElt.classList.toggle('d-none');
    }

    static isUuidValid = (uuid) => {
        return validate(uuid);
    }

}

export default Util;
