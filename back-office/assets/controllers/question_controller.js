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

    onChangeCheckbox = async (e) => {
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

        let newUrl = Util.addParam(filterName, checkboxesChecked.join(','))
        window.history.pushState({}, "", newUrl);

        return checkboxesChecked;
    }

    getFilterCheckboxElements = (evt, attribute) => {
        const checkboxesFor = evt.target.getAttribute(attribute);

        return document.querySelectorAll(`input[data-checkboxes="${checkboxesFor}"]`);
    }

    // TODO CHange timeout
    onInput = (e) => {

        clearTimeout(this.timer)

        let newUrl;

        this.searchTarget.value !== ''
            ?
            newUrl = Util.addParam('search', this.searchTarget.value)
            :
            newUrl = Util.deleteParam(['search', 'page'])

        window.history.pushState({}, "", newUrl);

        this.timer = setTimeout(async () => {

            const fieldsToSort = this.buildParam();

            console.log("fieldsToSort", fieldsToSort);

            const filteredData = await Util.getFilteredData('questions', fieldsToSort);

            document.querySelector('#questions-block').innerHTML = filteredData;

            this.deletePageParam();

            clearTimeout(this.timer);

        },200) // 500
    }

    deletePageParam = () => {
        const newUrl = Util.deleteParam('page');

        window.history.pushState({}, "", newUrl);
    }

    buildParam = () => {
        let param = {};

        if (this.searchTarget.value !== '')
            param['search'] = this.searchTarget.value;

        if (this.categories.length > 0 && this.categories[0] !== 'all')
            param['categories'] = this.categories.join(',');

        if (this.questionTypes.length > 0 && this.questionTypes[0] !== 'all')
            param['questionTypes'] = this.questionTypes.join(',');

        if (this.statuses.length > 0 && this.statuses[0] !== 'all')
            param['statuses'] = this.statuses.join(',');

        console.log("finalParam",param);
        return param
    }

}
