import { Controller } from "stimulus";
import Util from "./util_controller";
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'

export default class extends Controller {

    static targets = ['search', 'category', 'questionType', 'status'];

    // SORTABLE_FIELDS = ['search', 'category', 'questionType', 'status'];
    page;
    timer;

    categorySelect;
    categories = [];
    questionTypes = [];
    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        // this.page = this.getCurrentPage(window.location.href);
        this.page = Util.getParam(window.location.href, 'page', 1, 'number');
        //Util.getParam();

        //TODO L'HYDRATER SI URL DONNE INFO ?
        this.categorySelect = new TomSelect('#category', {
            plugins: {
                remove_button: {},
                clear_button: {},
                no_active_items:{},
            },
            persist: false
        });

        this.categorySelect.on("item_add", (value, item) => {
            console.log("new item", value, item); // value qui nous intéresse
           this.onChange2(value, 'category', 'add')
        })

        this.categorySelect.on('', () => {
            console.log("change triggered");
        })

    }

    onChange2 = (value, field, action) => {
        switch (action) {
            case 'add':
                if (value === 'all') this.clearField(field);
                this.addCategory(value)
                break;
            case 'remove':
                break;
            case 'clear':
                break;
            default:
                throw new Error();
        }

        // switch (field) {
        //     case 'category':
        //         action === 'add' ? this.addCategory(value)
        //         break;
        //     case 'questionType':
        //         break;
        //     case 'status':
        //         break;
        //     default:
        //         throw new Error();
        // }
    }

    addCategory = (category) => {
        const allValueIndex = this.categories.indexOf('all');

        if (allValueIndex !== -1)
            this.categories.splice(allValueIndex, 1);

        this.categories.push(category);
    }

    clearField = (field) => {
        switch (field) {
                case 'category':
                    this.categories = [];
                    break;
                case 'questionType':
                    break;
                case 'status':
                    break;
                default:
                    throw new Error();
        }
    }

    toto = () => {
        console.log('C est toto !')
    }

    test = () => {
        console.log("categories", this.categories);
        // console.log(this.page);
        // console.log("toto", Util.hasGivenParam(window.location.href, "toto"))
        // console.log("page", Util.hasGivenParam(window.location.href, "page"))
        // console.log("search", Util.hasGivenParam(window.location.href, "search"))
        // console.log("page hasParam", Util.hasParam(window.location.href));
        // console.log(this.addParam(window.location.href, 'toto', 'momo'))
        // console.log(this.buildParam());
        // console.log(Util.getParam(window.location.href, 'search', null, 'string'))
    }

    onInput = (e) => {

        if (Number(this.timer)) return;

        this.timer = setTimeout(async () => {
            console.log(this.searchTarget.value);

            const newUrl = this.addParam(window.location.href, 'search', this.searchTarget.value);

            window.history.pushState({}, "", newUrl);

            // Se servir des valeurs targets pour envoyer les infos de search, catégories, types et statut selectionnés.
            const fieldsToSort = this.buildParam();
            const filteredData = await Util.getFilteredData('questions', fieldsToSort);

            console.log("reponse",filteredData);
            document.querySelector('#questions-block').innerHTML = filteredData;

            clearTimeout(this.timer);
            this.timer = null;
        },150)
    }

    onChange = async (e) => {
        const field = e.target.getAttribute('data-question-target')
        let keyValueField;
        let newUrl;
        let fieldsToSort;
        let filteredData;
        switch (field) {
            case 'category':
                console.log("categoryTarget", this.categoryTarget.value);
                // keyValueField = {[field]: this.categoryTarget.value};
                // newUrl = this.categoryTarget.value !== 'all'
                //     ?
                //     this.addParam(window.location.href, field, this.categoryTarget.value)
                //     :
                //     this.removeParam(window.location.href, field);
                // window.history.pushState({}, "", newUrl);
                // fieldsToSort = this.buildParam();
                // filteredData = await Util.getFilteredData('questions', fieldsToSort);
                // document.querySelector('#questions-block').innerHTML = filteredData;
                break;


                case 'questionType':
                keyValueField = {[field]: this.questionTypeTarget.value};
                newUrl = this.questionTypeTarget.value !== 'all'
                    ?
                    this.addParam(window.location.href, field, this.questionTypeTarget.value)
                    :
                    this.removeParam(window.location.href, field);
                window.history.pushState({}, "", newUrl);
                fieldsToSort = this.buildParam();
                filteredData = await Util.getFilteredData('questions', fieldsToSort);
                document.querySelector('#questions-block').innerHTML = filteredData;
                break;
            case 'status':
                keyValueField = {[field]: this.statusTarget.value};
                newUrl = this.statusTarget.value !== 'all'
                    ? this.addParam(window.location.href, field, this.statusTarget.value)
                    :
                    this.removeParam(window.location.href, field);
                window.history.pushState({}, "", newUrl);
                fieldsToSort = this.buildParam();
                filteredData = await Util.getFilteredData('questions', fieldsToSort);
                document.querySelector('#questions-block').innerHTML = filteredData;
                break;
            default:
                throw new Error();
        }

        console.log(keyValueField);
    }

    addParam = (url, paramName, value) => {

        if (Util.hasParam(url)) {
            if (Util.hasGivenParam(url, paramName)) {
                // Le virer de l'URL si value == 'all'
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
            // Ne pas le mettre si value == 'all'
            return `${url}&${paramName}=${value}`;
        }
        // Ne pas le mettre si value == 'all'
        return `${url}?${paramName}=${value}`;
    }

    removeParam = (url, paramName) => {

        if (Util.hasGivenParam(url, paramName)) {
            const baseURL = url.split('?')[0];

            const splitURL = url.split('?')[1].split('&');

            const paramInURL = splitURL.filter(param => param.includes(`${paramName}=`))[0];

            splitURL.forEach((param, index) => {
                if (param === paramInURL)
                    splitURL.splice(index, 1)
            })

            console.log('splitUR', splitURL);

            return splitURL.length > 0 ? `${baseURL}?${splitURL.join('&')}` : baseURL;
        }

        return url;
    }

    buildParam = () => {
        let param = {};

        if (this.searchTarget.value !== '')
            param['search'] = this.searchTarget.value;
        if (this.categoryTarget.value !== 'all')
            param['category'] = this.categoryTarget.value;
        if (this.questionTypeTarget.value !== 'all')
            param['questionType'] = this.questionTypeTarget.value;
        if (this.statusTarget.value !== 'all')
            param['status'] = this.statusTarget.value;

        return !param.hasOwnProperty('search')
        && !param.hasOwnProperty('category')
        && !param.hasOwnProperty('questionType')
        && !param.hasOwnProperty('status') ? null : param
    }

}
