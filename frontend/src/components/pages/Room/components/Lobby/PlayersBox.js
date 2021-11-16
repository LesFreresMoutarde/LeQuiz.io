import React from "react";
import PlayerLine from "./PlayerLine";

const PlayersBox = ({players, host, currentPlayer}) => {
    return (
        <div className="lobby-box lobby-box-players">
            <div className="lobby-box-header">
                <span className="lobby-box-header-label">Joueurs</span>
            </div>
            <div className="lobby-box-content wide-borders">
                <div className="lobby-box-scrollable-content">
                    {players.map((player, index) => {
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
