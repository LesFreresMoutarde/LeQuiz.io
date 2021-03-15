const GameUtil = require("../util/GameUtil");

class RoomManager {
    
   static rooms = [];
    
    static players = [];

    static reinitRoomGame = (room) => {
        clearTimeout(room.game.timer);
        room.state = 'lobby';
        room.game.quizLength = 0;
        room.game.round = 0;
        room.game.quiz = [];
        room.hasAnswered = [];
        room.game.scores.forEach((scoreLine) => {
            scoreLine.value = 0;
            scoreLine.rank = 0
            scoreLine.lastAnswer = null;
        })
    };

    static getNoAnswerPlayers = (room) => {

        const socketIds = [];

        room.players.forEach((player) => {
            if (!room.game.hasAnswered.includes(player.socketId)) socketIds.push(player.socketId);
        });

        return socketIds;
    }

    static handleNewPlayer = (username, socketId) => {
        let player = RoomManager.findPlayer(socketId);

        if (player.length === 0) player = RoomManager.createPlayer(username, socketId)

        else player = player[0];

        return player;
    };

    static findPlayer = (socketId) => {

        return RoomManager.players.filter(player => player.socketId === socketId)
    };

    static createPlayer = (username, socketId) => {
        const player = {
            username,
            socketId
        };

        RoomManager.players.push(player);
        return player;
    };


    static handleRoomJoining = (roomId, isHost, player) => {
        let joined = false;
        let room = RoomManager.findRoom(roomId);

        if (room.length > 0) {
            room = room[0]
            joined = RoomManager.playerJoinRoom(player, room);

        } else {

            room = null;

            if (isHost) {
                room = RoomManager.createRoom(roomId, player);
                joined = true
            }
        }

        return {room, joined};
    };

    static findRoom = (roomId) => {
        return RoomManager.rooms.filter(room => room.id === roomId)
    };

    static findRoomByPlayer = (player) => {
        let room = null;

        RoomManager.rooms.forEach((activeRoom) => {
            activeRoom.players.forEach((playerInRoom) => {
                if (playerInRoom.socketId === player.socketId) room = activeRoom;
            })
        });

        return room;
    };

    static createRoom = (roomId, host) => {
        const room = {
            id: roomId,
            host,
            state: 'lobby',
            players: [host],
            game: {
                timer: null,
                quizLength: 0,
                round: 0,
                quiz: [],
                scores: [
                    {
                        player: host,
                        value: 0,
                        rank: 0,
                        lastAnswer: null,
                    }
                ],
                hasAnswered: []
            }
        };

        RoomManager.rooms.push(room);

        return room;
    };

    static playerJoinRoom = (player, room) => {
        //TODO V2, PERMETTRE DE REJOINDRE EN COURS DE PARTIE
        if (room.players.length >= 8 || room.state !== 'lobby') {
            return false
        }

        room.players.push(player);

        room.game.scores.push({
            player: player,
            value: 0,
            rank: 0,
            lastAnswer: null,
        });

        return true;
    };


    static handlePlayerDisconnect = (socketId) => {

        const player = RoomManager.findPlayer(socketId)[0];

        if (!player) return {hasRoomToBeUpdated: false, hasScoresToBeDisplayed: false, room: null};

        let room = RoomManager.findRoomByPlayer(player);

        if (!room) return {hasRoomToBeUpdated: false, hasScoresToBeDisplayed: false, room: null};

        let hasRoomToBeUpdated = true;
        RoomManager.playerLeaveRoom(player, room);

        const isRoomDeletable = RoomManager.checkIfRoomIsDeletable(room);

        let hasScoresToBeDisplayed = false;

        if (isRoomDeletable) {
            RoomManager.deleteRoom(room);
            hasRoomToBeUpdated = false;
        } else {

            const hostHasToBeTransferred = RoomManager.checkIfHostHasToBeTransferred(player, room);

            if (hostHasToBeTransferred) room = RoomManager.changeRoomHost(room);

            if (RoomManager.checkIfAllAnswersReceived(room)) hasScoresToBeDisplayed = true
        }

        RoomManager.deletePlayer(player);

        return {hasRoomToBeUpdated, hasScoresToBeDisplayed, room};
    };


    static playerLeaveRoom = (player, room) => {
        let playerIndex = -1;
        let scoreIndex = -1;


        room.game.scores.forEach((lineScore, index) => {
            if (lineScore.player.socketId === player.socketId) scoreIndex = index
        });

        room.game.scores.splice(scoreIndex, 1);

        room.players.forEach((playerInRoom, index) => {
            if (playerInRoom.socketId === player.socketId) playerIndex = index;
        });

        room.players.splice(playerIndex, 1);
    };

    static checkIfRoomIsDeletable = (room) => {
        return room.players.length === 0;
    };

    static deleteRoom = (room) => {
        let index = -1;

        RoomManager.rooms.forEach((activeRoom, i) => {
            if (activeRoom.id === room.id) {
                index = i;
                clearTimeout(room.game.timer);
            }
        });

        RoomManager.rooms.splice(index, 1);

        index = GameUtil.ROOMS_ID.indexOf(room.id);
        GameUtil.ROOMS_ID.splice(index, 1);
    };

    static checkIfHostHasToBeTransferred = (player, room) => {
        return room.host.socketId === player.socketId;
    };

    static changeRoomHost = (room) => {
        room.host = room.players[0];
        return room;
    };

    static deletePlayer = (player) => {
        let index = -1;
        RoomManager.players.forEach((activePlayer, i) => {
            if (activePlayer.socketId === player.socketId) index = i;
        });

        RoomManager.players.splice(index, 1);

        if (player.username.startsWith('Guest#')) {
            const guestId = player.username.split('#')[1];
            const index = GameUtil.GUEST_IDS.indexOf(guestId);
            GameUtil.GUEST_IDS.splice(index, 1);
        }
    };

    static handlePlayerResult = (socketId, result) => {
        const player = RoomManager.findPlayer(socketId)[0];


        if (player) {

            const room = RoomManager.findRoomByPlayer(player);

            room.game.scores.forEach((scoreLine) => {
                if (scoreLine.player.socketId === player.socketId) {
                    scoreLine.value += Number(result);
                    scoreLine.lastAnswer = result;
                }
            });

            room.game.scores = RoomManager.sortScoresRank(room.game.scores);

            room.game.hasAnswered.push(player.socketId);

            const receivedAllAnswers = RoomManager.checkIfAllAnswersReceived(room);

            if (receivedAllAnswers) {
                room.game.quiz.shift();
                room.game.hasAnswered = [];
                room.game.round++;
            }

            return {receivedAllAnswers, room};

        } else {
            return {receivedAllAnswers: false, room: null};
        }
    };

    static checkIfAllAnswersReceived = (room) => {
        let receivedAllAnswers = true;

        room.players.forEach((player) => {
            if (!room.game.hasAnswered.includes(player.socketId)) receivedAllAnswers = false
        });

        return receivedAllAnswers;
    };

    static sortScoresRank = (scores) => {

        scores.sort((a, b) => {
            return b.value - a.value
        });

        scores[0].rank = 1;

        for (let i = 1; i < scores.length; i++) {
            scores[i].rank = i + 1;

            if (scores[i - 1].value === scores[i].value) scores[i].rank = scores[i - 1].rank;
        }

        return scores;
    }
    
}

module.exports = RoomManager;
