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
        flatpickr('#edit_user_unbanDate', {minDate: 'today'})
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


}
