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
        this.page = parseInt(Util.getQueryStringParam('page', 1, 'number'));

        const paramsInUrl = Util.getQueryStringParams();

        this.fillFilterInputs(paramsInUrl);
    }

    fillFilterInputs = (params) => {

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

    showCheckboxes = (evt) => {
        const checkboxesFor = evt.currentTarget.getAttribute('data-checkboxes-for');

        const checkboxesDivElt = document.querySelector(`#${checkboxesFor}`)

        checkboxesDivElt.classList.toggle('d-none');
    }

    onPick = async (evt) => {
        const checkboxElts = this.getFilterCheckboxElements(evt, 'data-checkboxes-for');

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

        this.filters[filter] = this.addAllToFilter(filter);

        const fieldsParam = this.buildParam();


        const filteredData = await Util.getFilteredData('questions', fieldsParam);

        document.querySelector('#questions-block').innerHTML = filteredData;
    }

    onMultiCheckboxesChange = async (evt) => {
        const checkboxElts = this.getFilterCheckboxElements(evt, 'data-checkboxes');

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
        const newUrl = Util.deleteQueryStringParam(filterName);

        window.history.pushState({}, "", newUrl);

        return ['all'];
    }

    handleCheckboxChange = (filterName, checkboxes, checkboxesChecked) => {

        if (checkboxesChecked.length === 0 || checkboxesChecked.length === checkboxes.length) {
            return this.addAllToFilter(filterName)
        }

        const newUrl = Util.addQueryStringParam(filterName, checkboxesChecked.join(','))
        window.history.pushState({}, "", newUrl);

        return checkboxesChecked;
    }

    getFilterCheckboxElements = (evt, attribute) => {
        const checkboxesFor = evt.target.getAttribute(attribute);

        return document.querySelectorAll(`input[data-checkboxes="${checkboxesFor}"]`);
    }

    onInput = (evt) => {

        clearTimeout(this.timer)

        const value = evt.target.value;

        const filter = evt.target.getAttribute('data-input');

        let newUrl;

        this.filters[filter] = evt.target.value;
        this.filters[filter]
            ? newUrl = Util.addQueryStringParam(filter, this.filters[filter])
            : newUrl = Util.deleteQueryStringParam([filter, 'page']);

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

    onSingleCheckboxChange = async (evt) => {
        const filter = evt.target.getAttribute('data-checkbox');

        const value = evt.target.checked;

        this.filters[filter] = value;

        let newUrl;

        value
            ? newUrl = Util.addQueryStringParam(filter, value)
            : newUrl = Util.deleteQueryStringParam(filter);

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
        const newUrl = Util.deleteQueryStringParam('page');

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

    onFullAnswer = (evt) => {
        const buttonElt = evt.target;

        const index = buttonElt.getAttribute('data-full-answer-button');

        const answerDivElt = document.querySelector(`div[data-full-answer="${index}"]`);

        buttonElt.classList.toggle('bi-plus-square-fill');
        buttonElt.classList.toggle('bi-dash-square-fill');
        buttonElt.classList.toggle('text-primary');
        buttonElt.classList.toggle('text-danger')

        answerDivElt.classList.toggle('d-none');
    }

    onFullAnswerMouseEvent= (evt) => {
        const buttonElt = evt.target;

        switch (evt.type) {
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

    onAddAnswer = () => {
        const answersElt = document.querySelectorAll('.question-answers');

        const answerMainDivElt = document.querySelector('#answers');

        const duplicatedAnswer = answersElt[0].cloneNode(true);

        const radiosInputElt = duplicatedAnswer.querySelectorAll('input[type="radio"]');

        const textareaElt = duplicatedAnswer.querySelector('textarea');

        textareaElt.textContent = '';

        radiosInputElt.forEach((radioInputElt) => {
            radioInputElt.removeAttribute('checked');
        })

        const answersId = Array.from(answersElt)
            .map(answerElt => answerElt.id.replace('answer-', ''));

        const newAnswerId = this.getNewAnswerId(answersId);

        const regex = new RegExp(answersElt[0].id.replace('answer-', ''),'ig')

        const newAnswerDOMString = duplicatedAnswer.outerHTML.replaceAll(regex, newAnswerId)

        answerMainDivElt.insertAdjacentHTML("beforeend", newAnswerDOMString);
    }

    getNewAnswerId = (answersId) => {
        let newAnswerId = ''
        do {
            newAnswerId = Math.round(Math.random() * (999 - 100) + 100)
        } while (answersId.includes(newAnswerId))

        return newAnswerId;
    }

    onDeleteAnswer = (evt) => {
        const idToDelete = evt.currentTarget.getAttribute('data-delete-id');

        document.querySelector(`#answer-${idToDelete}`).remove();
    }
}
