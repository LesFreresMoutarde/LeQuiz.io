import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    ENTITY_NAME = 'questions';
    BLOCK_TO_REPLACE = '#questions-block';
    page;
    timer;

}
