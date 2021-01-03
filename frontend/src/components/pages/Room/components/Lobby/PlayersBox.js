import React from "react";

const PlayersBox = ({players, host, currentPlayer}) => {
    console.log('players form playersBox', players);
    console.log('host depuis playersBox', host);
    console.log("currentPlayer from playersbox", currentPlayer);
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
                        return (<li key={index}>{playerData}</li>)
                    })}
            </div>
        </div>
    )
};

export default PlayersBox;
