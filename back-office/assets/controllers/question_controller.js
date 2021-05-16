import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    static targets = ['search', 'category', 'questionType', 'status'];

    // SORTABLE_FIELDS = ['search', 'category', 'questionType', 'status'];
    page;
    timer;

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        // this.page = this.getCurrentPage(window.location.href);
        this.page = Util.getParam(window.location.href, 'page', 1, 'number');
        //Util.getParam();
    }

    test = () => {
        console.log(this.page);
        console.log("toto", Util.hasGivenParam(window.location.href, "toto"))
        console.log("page", Util.hasGivenParam(window.location.href, "page"))
        console.log("search", Util.hasGivenParam(window.location.href, "search"))
        console.log("page hasParam", Util.hasParam(window.location.href));
        console.log(this.addParam(window.location.href, 'toto', 'momo'))
        // console.log(Util.getParam(window.location.href, 'search', null, 'string'))
    }

    onInput = (e) => {

        if (Number(this.timer)) return;

        this.timer = setTimeout(async () => {
            console.log(this.searchTarget.value);

            const newUrl = this.addParam(window.location.href, 'search', this.searchTarget.value);

            window.history.pushState({}, "", newUrl);

            const filteredData = await Util.getFilteredData('questions', this.searchTarget.value);

            console.log(filteredData)

            clearTimeout(this.timer);
            this.timer = null;
        },100)
    }

    addParam = (url, paramName, value) => {

        if (Util.hasParam(url)) {
            if (Util.hasGivenParam(url, paramName)) {
                const baseURL = url.split('?')[0];

                const splitURL = url.split('?')[1].split('&');

                const paramInURL = splitURL.filter(param => param.includes(`${paramName}=`))[0];

                splitURL.forEach((param, index) => {
                    if (param === paramInURL && value !== '')
                        splitURL[index] = `${paramName}=${value}`;
                    else if (param === paramInURL && value === '')
                        splitURL.splice(index, 1);
                });

                return `${baseURL}?${splitURL.join('&')}`;
            }

            return `${url}&${paramName}=${value}`;
        }

        return `${url}?${paramName}=${value}`;
    }

    onChange = (e) => {
        const field = e.target.getAttribute('data-question-target')
        let keyValueField;

        switch (field) {
            case 'category':
                keyValueField = {[field]: this.categoryTarget.value};
                break;
            case 'questionType':
                keyValueField = {[field]: this.questionTypeTarget.value};
                break;
            case 'status':
                keyValueField = {[field]: this.statusTarget.value};
                break;
            default:
                throw new Error();
        }

        console.log(keyValueField);
    }

}
