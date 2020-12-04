const MainController = require('./mainController/MainController');

class UserController extends MainController {

    generateGuestName = () => {
        let guestId = "";
        const possible = "0123456789";
        let user = new Object();
        //TODO : recuperer les id des guest de la room
        let arrayGuestId = [];

        while (arrayGuestId.includes(guestId) || guestId === "") {
            guestId = "";
            for (let i = 0; i < 6; i++) {
                guestId += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        user.id = guestId;
        return user;
    }
}

module.exports = UserController;