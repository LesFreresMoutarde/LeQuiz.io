import React from "react";
import Util from "../../../../util/Util";
import GameUtil from "../../../../util/GameUtil";

class Room extends React.Component {

    constructor(props) {
        super(props);
        console.log("la conf de la game", Util.getObjectFromSessionStorage(GameUtil.GAME_CONFIGURATION.key));
    }

    render() {
        return (
            <div>
                la room
            </div>
        );
    }


}

export default Room;