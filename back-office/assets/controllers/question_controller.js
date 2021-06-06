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
    search;
    uuid;
    categories = ['all']; //TODO Handling in connect();
    questionTypes = ['all'];
    statuses = ['all'];
    isHardcore;
    hasMedia;

    filters = {
        search: '',
        uuid: '',
        categories: ['all'],
        questionTypes: ['all'],
        statuses: ['all'],
        isHardcore: false,
        hasMedia: false,
    }

    initialize = () => {
        console.log('init');

        this.page = parseInt(Util.getParam('page', 1, 'number'));
        const paramsInUrl = Util.getParams();

        // delete paramsInUrl['page'];

        this.fill(paramsInUrl);
    }

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        this.page = parseInt(Util.getParam('page', 1, 'number'));
        console.log("this page", this.page);
    }


    // Cannot use
    fill = (params) => {

        if (!params) return;

        delete params['page'];

        let inputElt;

        for (const param in params) {
            switch (typeof this.filters[param]) {
                case "string":
                case "boolean":
                    this.filters[param] = params[param];
                    inputElt = document.querySelector(`#${param}-input`);
                    inputElt.type === 'checkbox'
                        ? inputElt.checked = !!this.filters[param]
                        : inputElt.value = this.filters[param];
                    break;
                case "object":
                    this.filters[param] = params[param].split(',');
                    const checkboxes = document.querySelectorAll(`input[data-checkboxes="${param}"]`);
                    checkboxes.forEach(checkbox => {
                        if (this.filters[param].includes(checkbox.value))
                            checkbox.checked = true;
                    })
                    break;
                default:
                    throw new Error();
            }
        }

        // for (const paramName in params) {
        //     console.log(params[paramName])
        //     let inputElt;
        //     switch (paramName) {
        //         case 'search':
        //             this.search = params[paramName];
        //             inputElt = document.querySelector('#search-input');
        //             inputElt.value = params[paramName];
        //             break;
        //         case 'uuid':
        //             this.uuid = params[paramName];
        //             inputElt = document.querySelector('#search-input');
        //             inputElt.value = params[paramName];
        //             break;
        //         case 'categories':
        //             this.categories = params[paramName].split(',');
        //             const categoriesCheckboxes = document.querySelectorAll('input[data-checkboxes="categories"]');
        //             categoriesCheckboxes.forEach(checkbox => {
        //                 console.log
        //             })
        //             break;
        //         case 'questionTypes':
        //             this.questionTypes = params[paramName].split(',');
        //             break;
        //         case 'statuses':
        //             this.statuses = params[paramName].split(',');
        //             break;
        //         case 'isHardcore':
        //             this.isHardcore = !!params[paramName];
        //             break;
        //         case 'hasMedia':
        //             this.hasMedia = !!params[paramName];
        //             break;
        //         default:
        //             throw new Error();
        //     }
        // }

    }

    test = () => {
        this.buildParam();
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

        const filter = checkboxElts[0].getAttribute('data-checkboxes')

        this.filters[filter] = this.addAllToFilter(filter);

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

        const filter = checkboxElts[0].getAttribute('data-checkboxes')

        this.filters[filter] = this.handleCheckboxChange(filter, checkboxElts, checkboxesChecked);

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

        const value = e.target.value;
        console.log("value", value);

        const filter = e.target.getAttribute('data-input');

        let newUrl;

        this.filters[filter] = e.target.value;
        this.filters[filter]
            ? newUrl = Util.addParam(filter, this.filters[filter])
            : newUrl = Util.deleteParam([filter, 'page']);

        window.history.pushState({}, "", newUrl);

        this.timer = setTimeout(async () => {

            // Database is waiting for a valid uuid, otherwise it crashes.
            console.log('uuid', this.uuid)
            if (filter === 'uuid' && !Util.isUuidValid(this.filters.uuid) && this.filters.uuid !== '') {
                console.log('INVALID UUID');
                //TODO Toastr
                clearTimeout(this.timer);
                return;
            }

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

        this.filters[filter] = value;

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
        let param = {};

        for (const filter in this.filters) {
            switch (typeof this.filters[filter]) {
                case "string":
                case "boolean":
                    if (this.filters[filter])
                        param[filter] = this.filters[filter];
                    break;
                case "object":
                    if (this.filters[filter].length > 0 && this.filters[filter][0] !== 'all')
                        param[filter] = this.filters[filter].join(',')
                    break;
                default:
                    throw new Error();
            }
        }

        console.log("finalParam",param);
        return param
    }

    onFullAnswer = (e) => {
        const buttonElt = e.target;

        const index = buttonElt.getAttribute('data-full-answer-button');

        const answerDivElt = document.querySelector(`div[data-full-answer="${index}"]`);

        buttonElt.classList.toggle('bi-plus-square-fill');
        buttonElt.classList.toggle('bi-dash-square-fill');
        buttonElt.classList.toggle('text-primary');
        buttonElt.classList.toggle('text-danger')

        answerDivElt.classList.toggle('d-none');
    }

    onFullAnswerMouseEvent= (e) => {
        const buttonElt = e.target;

        switch (e.type) {
            case 'mouseenter':
                if (buttonElt.classList.contains('bi-plus-square')) {
                    buttonElt.classList.remove('bi-plus-square');
                    buttonElt.classList.add('bi-plus-square-fill');
                    return;
                }
                buttonElt.classList.remove('bi-dash-square');
                buttonElt.classList.add('bi-dash-square-fill');
                break;
            case 'mouseleave':
                if (buttonElt.classList.contains('bi-plus-square-fill')) {
                    buttonElt.classList.remove('bi-plus-square-fill');
                    buttonElt.classList.add('bi-plus-square');
                    return;
                }
                buttonElt.classList.remove('bi-dash-square-fill');
                buttonElt.classList.add('bi-dash-square');
                break;
            default:
                throw new Error();
        }
    }

}
