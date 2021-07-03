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
            flatpickr('.date-picker', {
                dateFormat: 'd-m-Y H:i:S',
                enableTime: true,
                minTime: '00:00',
                maxTime: '00:00',
                minDate: new Date().fp_incr(1),
            });
        } else if (unbanDateInputElt && unbanDateInputElt.getAttribute('data-disabled')) {
            // If context === 'show'. We disabled the input here because doing that in view prevents flatpickr working.
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

    deleteUser = async (evt) => {
        const uuid = evt.currentTarget.getAttribute('data-uuid');
        await Util.deleteEntity(this.ENTITY_NAME, uuid);
    }

    resetPassword = async (evt) => {
        const uuid = evt.currentTarget.getAttribute('data-user');

        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');

        const response = await fetch(`/${this.ENTITY_NAME}/reset-password/${uuid}`, {headers})

        console.log('response', await response.text())
    }
}
