import { Controller } from "stimulus";
import Util from "./util_controller";
import flatpickr from "flatpickr";
import '../../node_modules/flatpickr/dist/flatpickr.min.css'

export default class extends Controller {

    ENTITY_NAME = 'users';
    BLOCK_TO_REPLACE = '#users-block';
    page;
    timer;

    filters = {
        search: '',
        uuid: '',
        plans: ['all'],
        roles: ['all'],
        isTrustyWriter: false,
        isActive: false,
        isBanned: false,
    }

    initialize = () => {
        this.page = parseInt(Util.getQueryStringParam('page', 1, 'number'));

        const paramsInUrl = Util.getQueryStringParams();
        Util.fillFilterInputs(paramsInUrl, this.filters);

        const unbanDateInputElt = document.querySelector('.date-picker');
        if (unbanDateInputElt && !unbanDateInputElt.getAttribute('data-disabled')) {
            console.log(unbanDateInputElt.getAttribute('data-disabled'))
            flatpickr('.date-picker', {
                dateFormat: 'd-m-Y H:i:S',
                enableTime: true,
                minTime: '00:00',
                maxTime: '00:00',
                minDate: new Date().fp_incr(1),
            });
        } else if (unbanDateInputElt && unbanDateInputElt.getAttribute('data-disabled')) {
            unbanDateInputElt.setAttribute('disabled', 'true');
        }
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

    clearUnbanDateField = () => {
        document.querySelector('.date-picker').value = null;
    }

}
