import React from "react";
import PlayerLine from "./PlayerLine";

const PlayersBox = ({players, host, currentPlayer}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Joueurs</p>
            </div>
            <div className="lobby-box-content">
                    {players.map((player, index) => {
                        let playerData = player.username;
                        if (player.socketId === currentPlayer.socketId) playerData += ' (Vous)';
                        if (host.socketId === player.socketId) playerData += ' (Host)';
                        return (
                            <PlayerLine key={index} player={playerData}/>
                        )

                    })}
            </div>
        </div>
    )
};

export default PlayersBox;
