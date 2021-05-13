import { Controller } from "stimulus";

export default class extends Controller {

    showSubLinks = (e) => {
        const linkId = e.currentTarget.getAttribute('data-link-id');

        if (document.querySelector(`#${linkId}`)) {
            const linkElt = document.querySelector(`#${linkId}`);

            if (!linkElt.classList.contains('hard-active')) linkElt.classList.add('active');
        }

    }

    hideSubLinks = (e) => {
        const linkId = e.currentTarget.getAttribute('data-link-id');

        if (document.querySelector(`#${linkId}`)) {
            const linkElt = document.querySelector(`#${linkId}`);

            if (!linkElt.classList.contains('hard-active')) linkElt.classList.remove('active');
        }
    }

}
