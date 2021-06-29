import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {
    ENTITY_NAME = 'refresh-tokens';
    BLOCK_TO_REPLACE = '#refreshTokens-block';
    page;
    timer;

    filters = {
        search: '',
    }

    initialize = () => {
        this.page = parseInt(Util.getQueryStringParam('page', 1, 'number'));

        const paramsInUrl = Util.getQueryStringParams();
        Util.fillFilterInputs(paramsInUrl, this.filters);
    }

    onInput = (evt) => {
        Util.onFormInput(this.timer, this.filters, this.ENTITY_NAME, this.BLOCK_TO_REPLACE, evt);
    }

    deleteRefreshToken = async (evt) => {
        const uuid = evt.currentTarget.getAttribute('data-uuid');
        await Util.deleteEntity(this.ENTITY_NAME, uuid, false);
    }

    clearRefreshToken = async (evt) => {
        try {
            const headers = new Headers();
            headers.append('X-Requested-With', 'fetch');

            const scope = evt.currentTarget.getAttribute('data-scope');

            const response = await fetch(`/${this.ENTITY_NAME}/${scope}`, {headers, method: 'DELETE'});

            Util.handleResponseStatusFromDeleteRequest(response.status, `/${this.ENTITY_NAME}/`);

        } catch (error) {
            //TODO Quand Toastr pret
            console.error(error)
        }
    }


}
