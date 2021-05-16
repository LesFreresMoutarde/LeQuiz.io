import { Controller } from "stimulus";

export default class extends Controller {

    static targets = ['search']
    page;
    timer;

    connect = () => {
        console.log('connect');
        console.log(window.location.href);
        this.page = this.getCurrentPage(window.location.href);
    }

    test = () => {
        console.log(this.page);
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
        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');

        const response = await fetch(`/questions?search=${this.searchTarget.value}`, {headers});
        console.log(await response.text());

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
