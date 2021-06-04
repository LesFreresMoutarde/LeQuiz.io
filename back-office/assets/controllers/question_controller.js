import { Controller } from "stimulus";
import Util from "./util_controller";
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import util_controller from "./util_controller";

export default class extends Controller {

    static targets = ['search', 'uuid'];

    page;
    timer;

    categoriesSelect;
    categories = ['all']; //TODO Handling in connect();
    questionTypes = ['all'];
    statuses = ['all'];
    isHardcore;
    hasMedia;

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        this.page = parseInt(Util.getParam('page', 1, 'number'));
        console.log("this page", this.page);
    }

    test = () => {
        console.log("categories", this.categories);
        let newUrl = Util.addParam("toto", 'jolo');
        window.history.pushState({}, "", newUrl);
        newUrl = Util.addParam("lourd", 'frero');
        window.history.pushState({}, "", newUrl);
        // newUrl = Util.deleteParam('fake');
        // window.history.pushState({}, "", newUrl);
        // newUrl = Util.deleteParam('toto');
        // window.history.pushState({}, "", newUrl);
    }

    showCheckboxes = (e) => {
        const checkboxesFor = e.currentTarget.getAttribute('data-checkboxes-for');

        const checkboxesDivElt = document.querySelector(`#${checkboxesFor}`)

        if (checkboxesDivElt.classList.contains('d-none')) {
            checkboxesDivElt.classList.remove('d-none');
            return;
        }

        checkboxesDivElt.classList.add('d-none');
    }

    hideCheckboxes = (e) => {

        if (e.target.hasAttribute('data-filter-select') ||
            e.target.hasAttribute('data-click-not-hiding'))
            return;

        const checkboxesDivsElt = document.querySelectorAll('.checkboxes-div');

        checkboxesDivsElt.forEach(checkboxesDivElt => {
            if (!checkboxesDivElt.classList.contains('d-none'))
                checkboxesDivElt.classList.add('d-none');

        })
    }

    onPick = async (e) => {
        const checkboxElts = this.getFilterCheckboxElements(e, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        const value = e.target.getAttribute('data-pick');

        const checked = {full: true, empty: false};

        checkboxElts.forEach((checkboxElt) => {
            if (checkboxElt.checked !== checked[value]) {
                checkboxElt.checked = checked[value];
                checkboxesChangedCounter++
            }
        });

        if (checkboxesChangedCounter === 0) return;

        switch (checkboxElts[0].getAttribute('data-checkboxes')) {
            case 'categories':
                this.categories = this.addAllToFilter('categories');
                break;
            case 'questionTypes':
                this.questionTypes = this.addAllToFilter('questionTypes');
                break;
            case 'statuses':
                this.statuses = this.addAllToFilter('statuses');
                break;
            default:
                throw new Error();
        }

        const fieldsParam = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldsParam);
        console.log("filteredData", filteredData);

        document.querySelector('#questions-block').innerHTML = filteredData;
    }

    onMultiCheckboxesChange = async (e) => {
        const checkboxElts = this.getFilterCheckboxElements(e, 'data-checkboxes');

        const checkboxesChecked = Array.from(checkboxElts)
            .filter(checkbox => checkbox.checked)
            .map((checkbox) => checkbox.value);

        switch (checkboxElts[0].getAttribute('data-checkboxes')) {
            case 'categories':
                this.categories = this.handleCheckboxChange('categories', checkboxElts, checkboxesChecked);
                break;
            case 'questionTypes':
                this.questionTypes = this.handleCheckboxChange('questionTypes', checkboxElts, checkboxesChecked);
                break;
            case 'statuses':
                this.statuses = this.handleCheckboxChange('statuses', checkboxElts, checkboxesChecked);
                break;
            default:
                throw new Error();
        }

        const fieldsParam = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldsParam);

        this.deletePageParam();

        document.querySelector('#questions-block').innerHTML = filteredData;
    };

    addAllToFilter = (filterName) => {
        const newUrl = Util.deleteParam(filterName);

        window.history.pushState({}, "", newUrl);

        return ['all'];
    }

    handleCheckboxChange = (filterName, checkboxes, checkboxesChecked) => {

        if (checkboxesChecked.length === 0 || checkboxesChecked.length === checkboxes.length) {
            return this.addAllToFilter(filterName)
        }

        const newUrl = Util.addParam(filterName, checkboxesChecked.join(','))
        window.history.pushState({}, "", newUrl);

        return checkboxesChecked;
    }

    getFilterCheckboxElements = (evt, attribute) => {
        const checkboxesFor = evt.target.getAttribute(attribute);

        return document.querySelectorAll(`input[data-checkboxes="${checkboxesFor}"]`);
    }

    onInput = (e) => {

        clearTimeout(this.timer)

        const filter = e.target.getAttribute('data-input');

        let newUrl;

        switch (filter) {
            case 'search':
                this.searchTarget.value !== ''
                    ?
                    newUrl = Util.addParam('search', this.searchTarget.value)
                    :
                    newUrl = Util.deleteParam(['search', 'page'])
                break;
            case 'uuid':
                this.uuidTarget.value !== ''
                    ?
                    newUrl =  Util.addParam('uuid', this.uuidTarget.value)
                    :
                    newUrl = Util.deleteParam(['uuid', 'page'])
                break;
            default:
                throw new Error();
        }

        window.history.pushState({}, "", newUrl);

        this.timer = setTimeout(async () => {

            const fieldsToSort = this.buildParam();

            console.log("fieldsToSort", fieldsToSort);

            const filteredData = await Util.getFilteredData('questions', fieldsToSort);

            document.querySelector('#questions-block').innerHTML = filteredData;

            this.deletePageParam();

            clearTimeout(this.timer);

        },200)
    }

    onSingleCheckboxChange = async (e) => {
        const filter = e.target.getAttribute('data-checkbox');

        const value = e.target.checked;

        switch (filter) {
            case 'isHardcore':
                this.isHardcore = value;
                break;
            case 'hasMedia':
                this.hasMedia = value;
                break;
            default:
                throw new Error();

        }

        let newUrl;

        value
            ? newUrl = Util.addParam(filter, value)
            : newUrl = Util.deleteParam(filter);

        window.history.pushState({}, "", newUrl);

        const fieldToSort = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldToSort);

        document.querySelector('#questions-block').innerHTML = filteredData;

        this.deletePageParam();
    }

    deletePageParam = () => {
        const newUrl = Util.deleteParam('page');

        window.history.pushState({}, "", newUrl);
    }

    buildParam = () => {
        const values = {
            text: {
                search: this.searchTarget.value,
                uuid: this.searchTarget.uuid
            },
            array: {
                categories: this.categories,
                questionTypes: this.questionTypes,
                statuses: this.statuses
            },
            bool: {
                isHardcore: this.isHardcore,
                hasMedia: this.hasMedia
            }
        }

        let param = {};

        //REVIEW values[valueType] = paramName - values[valueType][paramName] = paramValue
        for (const valueType in values) {
            for (const paramName in values[valueType]) {
                switch (valueType) {
                    case 'text':
                        if (values[valueType][paramName])
                            param[paramName] = values[valueType][paramName];
                        break;
                    case 'array':
                        if (values[valueType][paramName].length > 0 && values[valueType][paramName][0] !== 'all')
                            param[paramName] = values[valueType][paramName].join(',');
                        break;
                    case 'bool':
                        if (values[valueType][paramName])
                            param[paramName] = values[valueType][paramName]
                        break;
                    default:
                        break;
                }
            }
        }

        console.log("finalParam",param);
        return param
    }

}
