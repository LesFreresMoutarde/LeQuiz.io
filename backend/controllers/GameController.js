const MainController = require('./mainController/MainController');

class GameController extends MainController {

    generateCodeRoom = () => {
        let codeRoom = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        //tableau à remplir des codes room déja réservé par d'autre rooms
        let arrayCodeRoom = [];

        while (arrayCodeRoom.includes(codeRoom) || codeRoom === "") {
            codeRoom = "";
            for (var i = 0; i < 6; i++) {
                codeRoom += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }

        return codeRoom;
    }
}

module.exports = GameController;