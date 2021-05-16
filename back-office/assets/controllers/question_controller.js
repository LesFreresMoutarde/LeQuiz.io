import { Controller } from "stimulus";
import Util from "./util_controller";

export default class extends Controller {

    static targets = ['search']
    page;
    timer;

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        // this.page = this.getCurrentPage(window.location.href);
        this.page = Util.getParam(window.location.href, 'page', 1, 'number');
        //Util.getParam();
    }

    test = () => {
        console.log(this.page);
        // console.log(Util.getParam(window.location.href, 'search', null, 'string'))
    }

    onInput = (e) => {
        const element = this.searchTarget;

        if (Number(this.timer)) return;

        this.timer = setTimeout(async () => {
            console.log(this.searchTarget.value);

            await this.getFilteredQuestions()

            clearTimeout(this.timer);
            this.timer = null;
        },500)
    }

    getFilteredQuestions = async () => {

        const responseData = await Util.getFilteredData('questions', this.searchTarget.value);
        console.log(responseData);
    }


    getCurrentPage = (url) => {

        const pageParam = url.includes('page=')
            ?
            parseInt(url.split('?')[1].split('&').filter(param => param.includes('page='))[0].split('=')[1])
            :
            1;

        if (isNaN(pageParam)) return 1;

        return pageParam;
    }

}
