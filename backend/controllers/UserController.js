const GameUtil = require("../util/GameUtil");
const MainController = require('./mainController/MainController');


class UserController extends MainController {

    actionGuestId = () => {

        const response = {};

        response.guestId = this.generateGuestName();

        this.response = response;
    };

    generateGuestName = () => {
        let guestId = '';
        const possible = "0123456789";

        while (GameUtil.GUEST_ID.includes(guestId) || guestId === '') {
            guestId = '';

            for (let i = 0; i < 6; i++) {
                guestId += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }

        GameUtil.GUEST_ID.push(guestId);

        return guestId;
    }
}

module.exports = UserController;
