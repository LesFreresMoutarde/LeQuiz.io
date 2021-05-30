import { Controller } from "stimulus";
import Util from "./util_controller";
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import util_controller from "./util_controller";

export default class extends Controller {

    static targets = ['search', 'category', 'questionType', 'status'];

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
        newUrl = Util.deleteParam('fake');
        window.history.pushState({}, "", newUrl);
        newUrl = Util.deleteParam('toto');
        window.history.pushState({}, "", newUrl);
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


    pickAll = (e) => {
        const checkboxesElt = this.getFilterCheckboxesElement(e, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        checkboxesElt.forEach((checkboxElt) => {
            if (!checkboxElt.checked) {
                checkboxElt.checked = true;
                checkboxesChangedCounter++
            }
        });

        if (checkboxesChangedCounter === 0) return;

        this.categories = ['all'];

        // Trigger Fetch BDD // Changement URL
        console.log("fetch bdd");
    }

    unpickAll = (e) => {
        const checkboxesElt = this.getFilterCheckboxesElement(e, 'data-checkboxes-for');

        let checkboxesChangedCounter = 0;

        checkboxesElt.forEach((checkboxElt) => {
            if (checkboxElt.checked) {
                checkboxElt.checked = false;
                checkboxesChangedCounter++
            }

        });

        if (checkboxesChangedCounter === 0) return;

        // Trigger Fetch BDD Changement Param URL
        console.log("fetch bdd");

        this.categories = ['all'];

    }

    onChangeCheckbox = (e) => {
        const checkboxesElt = this.getFilterCheckboxesElement(e, 'data-checkboxes');

        const checkboxesChecked = Array.from(checkboxesElt)
            .filter(checkbox => checkbox.checked)
            .map((checkbox) => checkbox.value);

        if (checkboxesChecked.length === 0 || checkboxesChecked.length === checkboxesElt.length) {
            this.categories = ['all']
            // Build Param + Fetch URL
            console.log("CATEGORIES === ALL");
            return;
        }

        this.categories = checkboxesChecked;

        // Build Param + Fetch URL

    };


    getFilterCheckboxesElement = (evt, attribute) => {
        const checkboxesFor = evt.target.getAttribute(attribute);

        return document.querySelectorAll(`input[data-checkboxes="${checkboxesFor}"]`);
    }

    onInput = (e) => {

        if (Number(this.timer)) return;

        this.timer = setTimeout(async () => {
            console.log(this.searchTarget.value);

            // const newUrl = this.addParam(window.location.href, 'search', this.searchTarget.value);
            const newUrl = Util.addParam('search', this.searchTarget.value);

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
