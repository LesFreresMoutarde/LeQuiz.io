import React from "react";

const PlayersBox = ({players, host, currentPlayer}) => {
    console.log('players form playersBox', players);
    console.log('host depuis playersBox', host);
    console.log("currentPlayer from playersbox", currentPlayer);
    return (
        <>
            <p>Players Box</p>
            <div>
                Les joueurs
                <ul>
                    {players.map((player, index) => {
                        let playerData = player.username;
                        if (player.socketId === currentPlayer.socketId) playerData += ' (Vous)';
                        if (host.socketId === player.socketId) playerData += ' (Host)';
                        return (<li key={index}>{playerData}</li>)
                    })}
                </ul>
            </div>
        </>
    )
};

export default PlayersBox;