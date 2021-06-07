import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    page;
    timer;

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
        this.page = parseInt(Util.getParam('page', 1, 'number'));

        const paramsInUrl = Util.getParams();

        this.fillInput(paramsInUrl);
    }

    fillInput = (params) => {

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
            }
        }
    }

    showCheckboxes = (e) => {
        const checkboxesFor = e.currentTarget.getAttribute('data-checkboxes-for');

        const checkboxesDivElt = document.querySelector(`#${checkboxesFor}`)

        checkboxesDivElt.classList.toggle('d-none');
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

        const filter = e.target.getAttribute('data-input');

        let newUrl;

        this.filters[filter] = e.target.value;
        this.filters[filter]
            ? newUrl = Util.addParam(filter, this.filters[filter])
            : newUrl = Util.deleteParam([filter, 'page']);

        window.history.pushState({}, "", newUrl);

        this.timer = setTimeout(async () => {

            // Database is waiting for a valid uuid, otherwise it crashes.
            if (filter === 'uuid' && !Util.isUuidValid(this.filters.uuid) && this.filters.uuid !== '') {
                //TODO TOASTR WHEN BUG RESOLVED
                clearTimeout(this.timer);
                return;
            }

            const fieldsToSort = this.buildParam();

            try {
                const filteredData = await Util.getFilteredData('questions', fieldsToSort);

                document.querySelector('#questions-block').innerHTML = filteredData;

            } catch (error) {
                //TODO TOASTR WHEN BUG RESOLVED
                console.error('Internal server error');
            } finally {
                this.deletePageParam();
                clearTimeout(this.timer);
            }

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

        const fieldsToSort = this.buildParam();

        try {
            const filteredData = await Util.getFilteredData('questions', fieldsToSort);

            document.querySelector('#questions-block').innerHTML = filteredData;

        } catch (error) {
            //TODO TOASTR WHEN BUG RESOLVED
            console.error('Internal server error');
        } finally {
            this.deletePageParam();
        }

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
            }
        }

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
                // Plus button
                if (buttonElt.classList.contains('bi-plus-square')) {
                    buttonElt.classList.remove('bi-plus-square');
                    buttonElt.classList.add('bi-plus-square-fill');
                    return;
                }
                // Minus Button
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
