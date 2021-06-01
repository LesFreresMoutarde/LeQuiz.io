import { Controller } from "stimulus";
import Util from "./util_controller";
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import util_controller from "./util_controller";

export default class extends Controller {

    static targets = ['search', 'category', 'questionTypes', 'status'];

    // SORTABLE_FIELDS = ['search', 'category', 'questionType', 'status'];
    page;
    timer;

    categoriesSelect;
    categories = ['all']; //TODO Handling in connect();
    questionTypes = [];

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        this.page = parseInt(Util.getParam('page', 1, 'number'));
        console.log("this page", this.page);
        // const newUrl = Util.addParam("toto", 'delavega');
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

    pickAll = async (e) => {
        const checkboxElts = this.getFilterCheckboxElements(e, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        checkboxElts.forEach((checkboxElt) => {
            if (!checkboxElt.checked) {
                checkboxElt.checked = true;
                checkboxesChangedCounter++
            }
        });

        if (checkboxesChangedCounter === 0) return;

        switch (checkboxElts[0].getAttribute('data-checkboxes')) {
            case 'categories':
                this.categories = this.addAllToFilter('categories');
                break;
            case 'questionTypes':
                //TODO
                break;
            default:
                throw new Error();
        }

        const fieldsParam = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldsParam);
        console.log("filteredData", filteredData);

        document.querySelector('#questions-block').innerHTML = filteredData;
    }

    unpickAll = async (e) => {
        const checkboxElts = this.getFilterCheckboxElements(e, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        checkboxElts.forEach((checkboxElt) => {
            if (checkboxElt.checked) {
                checkboxElt.checked = false;
                checkboxesChangedCounter++
            }
        });

        if (checkboxesChangedCounter === 0) return;

        switch (checkboxElts[0].getAttribute('data-checkboxes')) {
            case 'categories':
                this.categories = this.addAllToFilter('categories');
                break;
            case 'questionTypes':
                //TODO
                break;
            default:
                throw new Error();
        }

        const fieldsParam = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldsParam);
        console.log("filteredData", filteredData);
        Util.deleteParam('page');

        document.querySelector('#questions-block').innerHTML = filteredData;

    }

    onChangeCheckbox = async (e) => {
        const checkboxElts = this.getFilterCheckboxElements(e, 'data-checkboxes');

        const checkboxesChecked = Array.from(checkboxElts)
            .filter(checkbox => checkbox.checked)
            .map((checkbox) => checkbox.value);

        switch (checkboxElts[0].getAttribute('data-checkboxes')) {
            case 'categories':
                this.categories = this.handleCheckboxChange('categories', checkboxElts, checkboxesChecked)
                break;
            case 'questionTypes':
                break;
            default:
                throw new Error();
        }

        const fieldsParam = this.buildParam();

        const filteredData = await Util.getFilteredData('questions', fieldsParam);

        // Util.deleteParam('page');

        document.querySelector('#questions-block').innerHTML = filteredData;

       //Fetch URL
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
        newUrl = Util.deleteParam('page');

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

        this.timer = setTimeout(async () => {

            let newUrl;

            this.searchTarget.value !== ''
                ?
                newUrl = Util.addParam('search', this.searchTarget.value)
                :
                newUrl = Util.deleteParam('search')

            window.history.pushState({}, "", newUrl);

            // Se servir des valeurs targets pour envoyer les infos de search, catégories, types et statut selectionnés.
            const fieldsToSort = this.buildParam();
            console.log("fieldsToSort", fieldsToSort);
            const filteredData = await Util.getFilteredData('questions', fieldsToSort);
            //
            // console.log("reponse",filteredData);
            document.querySelector('#questions-block').innerHTML = filteredData;

            Util.deleteParam('page');

            clearTimeout(this.timer);

        },500) // 500
    }


    buildParam = () => {
        let param = {};

        if (this.searchTarget.value !== '')
            param['search'] = this.searchTarget.value;

        if (this.categories.length > 0 && this.categories[0] !== 'all')
            param['categories'] = this.categories.join(',');

        if (this.questionTypesTarget.value !== 'all')
            param['questionTypes'] = this.questionTypesTarget.value;

        if (this.statusTarget.value !== 'all')
            param['status'] = this.statusTarget.value;


        console.log("finalParam",param);
        return param
    }

}
