import React from "react";
import PlayerLine from "./PlayerLine";

const PlayersBox = ({players, host, currentPlayer}) => {
    for (let i = 0; i < 20; ++i) {
        players.push(players[0]);
    }

    return (
        <div className="lobby-box lobby-players-box">
            <div className="lobby-box-header">
                <span className="lobby-box-header-label">Joueurs</span>
            </div>
            <div className="lobby-box-content wide-borders">
                <div className="lobby-box-scrollable-content">
                    {players.map((player, index) => {
                        let playerData = player.username;
                        if (player.socketId === currentPlayer.socketId) playerData += ' (Vous)';
                        if (host.socketId === player.socketId) playerData += ' (Host)';
                        return (
                            <PlayerLine key={index}
                                        player={player}
                                        isCurrentPlayer={player.socketId === currentPlayer.socketId}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default PlayersBox;
