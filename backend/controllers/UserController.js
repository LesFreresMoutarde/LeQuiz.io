const MainController = require('./mainController/MainController');

class UserController extends MainController {

    generateGuestName = () => {
        let guestName = "guest";
        const possible = "0123456789";
        //recuperer les guest names de la partie
        let arrayGuestName = [];

        while (arrayGuestName.includes(guestName) || guestName === "guest") {
            guestName = "guest";
            for (let i = 0; i < 6; i++) {
                guestName += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        return guestName;
    }
}

module.exports = UserController;