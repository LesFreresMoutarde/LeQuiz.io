import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    ENTITY_NAME = 'categories';
    BLOCK_TO_REPLACE = '#categories-block';
    page;
    timer;

    filters = {
        search: '',
        uuid: '',
        isChild: false,
    }

}
