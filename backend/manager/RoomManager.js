
class RoomManager {
    
    static rooms = {};
    
    static players = {};

    static INITIALIZED_ROOM_STATE = 'initialized';
    static LOBBY_ROOM_STATE = 'lobby';
    static QUESTION_ROOM_STATE = 'question';
    static ANSWER_ROOM_STATE = 'answer';

    static resetRoomGame = (room) => {

        clearTimeout(room.game.timer);

        room.state = RoomManager.LOBBY_ROOM_STATE;
        room.game.quizLength = 0;
        room.game.round = 0;
        room.game.quiz = [];
        room.game.hasAnswered = [];
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

    //TODO Permettre plus tard à l'user de choisir son pseudo (plutot de le modifier une fois dans la room)
    static handleNewPlayer = (username, socketId, roomId) => {

        if (!username) username = RoomManager.generateGuestUsername('Guest', roomId);


        return RoomManager.createPlayer(username, socketId, roomId)

    };

    static findPlayer = (socketId) => {

        const player = RoomManager.players[socketId];

        if (player) return player;

        throw new Error();
    };

    static createPlayer = (username, socketId, roomId) => {
        const player = {
            username,
            socketId,
            roomId,
            createdAt: new Date()
        };

        RoomManager.players[socketId] = player;

        return player;
    };

    static handleRoomJoining = (roomId, isHost, player) => {

        const room = RoomManager.findRoom(roomId);

        if (room.state === RoomManager.INITIALIZED_ROOM_STATE && isHost) {
            RoomManager.completeRoom(room, player);

        } else {
            RoomManager.playerJoinRoom(player, room);
        }

        return room;

    };

    static findRoom = (roomId) => {

        const room = RoomManager.rooms[roomId];

        if (room) return room;

        throw new Error();

    };

    static createRoom = (roomId) => {

        RoomManager.rooms[roomId] = {
            id: roomId,
            createdAt: new Date(),
            state: RoomManager.INITIALIZED_ROOM_STATE
        };
    };

    static completeRoom = (room, host) => {
        room.host = host;
        room.state = RoomManager.LOBBY_ROOM_STATE;
        room.players = [host];
        room.game = {
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
    }

    static generateRoomId = () => {
        let roomId = '';
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        while (RoomManager.rooms.hasOwnProperty(roomId) || roomId === '') {

            roomId = '';

            for (let i = 0; i < 6; i++) {
                roomId += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }

        return roomId
    };

    static generateGuestUsername = (basename, roomId) => {
        let guestId = '';
        const possible = "0123456789";

        const room = RoomManager.findRoom(roomId);

        let roomUsernames = [];

        if (room.players) roomUsernames = room.players.map(player => player.username);

        while (roomUsernames.includes(`#${guestId}`) || guestId === '') {
            guestId = '';

            for (let i = 0; i < 3; i++) {
                guestId += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }

        return `${basename}#${guestId}`;
    }

    static playerJoinRoom = (player, room) => {

        if (room.players.length >= 8)
            throw new Error();

        room.players.push(player);

        room.game.scores.push({
            player: player,
            value: 0,
            rank: 0,
            lastAnswer: null,
        });
    };

    static handlePlayerDisconnect = (socketId) => {

        const player = RoomManager.findPlayer(socketId);

        const room = RoomManager.findRoom(player.roomId);

        let hasScoresToBeDisplayed = false;

        let hasRoomToBeUpdated = true;

        RoomManager.playerLeaveRoom(player, room);

        if (RoomManager.checkIfRoomIsDeletable(room)) {
            RoomManager.deleteRoom(room);
            hasRoomToBeUpdated = false;
        } else {

            if (RoomManager.checkIfHostHasToBeTransferred(player, room)) RoomManager.changeRoomHost(room);

            if (RoomManager.checkIfAllAnswersReceived(room)) hasScoresToBeDisplayed = true;
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

        if (scoreIndex !== -1) room.game.scores.splice(scoreIndex, 1);

        room.players.forEach((playerInRoom, index) => {
            if (playerInRoom.socketId === player.socketId) playerIndex = index;
        });

        if (playerIndex !== -1) room.players.splice(playerIndex, 1);
    };

    static checkIfRoomIsDeletable = (room) => {
        return room.players.length === 0;
    };

    static deleteRoom = (room) => {
        clearTimeout(room.game.timer);

        delete RoomManager.rooms[room.id];
    };

    static checkIfHostHasToBeTransferred = (player, room) => {
        return room.host.socketId === player.socketId;
    };

    static changeRoomHost = (room) => {
        room.host = room.players[0];
    };

    static deletePlayer = (player) => {
        delete RoomManager.players[player.socketId];
    };

    static handlePlayerResult = (socketId, roundPoints) => {
        const player = RoomManager.findPlayer(socketId);

        const room = RoomManager.findRoom(player.roomId);

            room.game.scores.forEach((scoreLine) => {
                if (scoreLine.player.socketId === player.socketId) {
                    scoreLine.value += roundPoints;
                    scoreLine.lastAnswer = Boolean(roundPoints);
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

    static formatRoomForEmit = (room) => {
        return {
            host: room.host,
            players: room.players,
            quizLength: room.game.quizLength,
            round: room.game.round,
            scores: room.game.scores
        };
    }

    static getTimeLeft = (room) => {
        return Math.ceil((room.game.timer._idleStart + room.game.timer._idleTimeout)/1000 - process.uptime());
    }
    
}

module.exports = RoomManager;
