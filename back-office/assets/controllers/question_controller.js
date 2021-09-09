import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    ENTITY_NAME = 'questions';
    BLOCK_TO_REPLACE = '#questions-block';
    page;
    timer;

    filters = {
        search: '',
        uuid: '',
        categories: ['all'],
        questionTypes: ['all'],
        tags: ['all'],
        statuses: ['all'],
        isHardcore: false,
        hasMedia: false,
    }

    initialize = () => {
        this.page = parseInt(Util.getQueryStringParam('page', 1, 'number'));

        const paramsInUrl = Util.getQueryStringParams();
        Util.fillFilterInputs(paramsInUrl, this.filters);
    }

    showCheckboxes = (evt) => {
        Util.showCheckboxes(evt);
    }

    onPick = async (evt) => {
        await Util.onCheckboxesButtonClick(this.filters, this.ENTITY_NAME, this.BLOCK_TO_REPLACE, evt);
    }

    onMultiCheckboxesChange = async (evt) => {
        await Util.onMultiCheckboxesChange(this.filters, this.ENTITY_NAME, this.BLOCK_TO_REPLACE, evt);
    };

    onInput = (evt) => {
        Util.onFormInput(this.timer, this.filters, this.ENTITY_NAME, this.BLOCK_TO_REPLACE, evt);
    }

    onUniqueCheckboxChange = async (evt) => {
        await Util.onUniqueCheckboxChange(this.filters, this.ENTITY_NAME, this.BLOCK_TO_REPLACE, evt);
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

    onAddAnswer = (e) => {
        // console.log(e.currentTarget);
        const questionFormat = e.currentTarget.getAttribute('data-question-format');
        console.log('questionFormat', questionFormat);

        const answersElt = document.querySelectorAll('.question-answers');
        console.log("all answers elt", answersElt);

        // const answerMainDivElt = document.querySelector('#answers');

        const duplicatedAnswer = answersElt[0].cloneNode(true);

        const radiosInputElt = duplicatedAnswer.querySelectorAll('input[type="radio"]');

        const textareaElt = duplicatedAnswer.querySelector('textarea');

        textareaElt.textContent = '';

        radiosInputElt.forEach((radioInputElt) => {
            questionFormat === 'qcm' ? radioInputElt.removeAttribute('checked') : radioInputElt.remove();
        })

        if (questionFormat === 'input') {
            const radioLabelsContainer = duplicatedAnswer.querySelector('.radio-labels-container');
            radioLabelsContainer.remove();
        }

        const answersId = Array.from(answersElt)
            .map(answerElt => answerElt.id.replace('answer-', ''));

        const newAnswerId = this.getNewAnswerId(answersId);

        const regex = new RegExp(answersElt[0].id.replace('answer-', ''),'ig')

        const newAnswerDOMString = duplicatedAnswer.outerHTML.replaceAll(regex, newAnswerId)

        const answerMainDivElt = questionFormat === 'qcm'
            ? document.querySelector('#qcm-answers')
            : document.querySelector('#input-answers')
        ;

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

    deleteQuestion = async (evt) => {
        const uuid = evt.currentTarget.getAttribute('data-uuid');
        await Util.deleteEntity(this.ENTITY_NAME, uuid);
    }
}
