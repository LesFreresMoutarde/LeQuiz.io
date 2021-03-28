const cron = require('node-cron');
const RoomManager = require('./RoomManager');

class CronManager {

    static executeCronTasks = () => {
        CronManager.removeDirtyRooms();
        CronManager.removeDirtyPlayers();
    }

    static removeDirtyRooms = () => {

        cron.schedule('0 3 * * *', () => {

            const date = new Date();
            date.setDate(date.getDate() - 1);

            const roomIds = Object.keys(RoomManager.rooms);

            for (let i = 0; i < roomIds.length; i++) {
                if (RoomManager.rooms[roomIds[i]].createdAt <= date
                    &&
                    RoomManager.rooms[roomIds[i]].players.length === 0)
                        delete RoomManager.rooms[roomIds[i]];
            }
        })
    }

    static removeDirtyPlayers = () => {
        cron.schedule('0 3 * * *', () => {

            const date = new Date();
            date.setDate(date.getDate() - 1);

            const socketIds = Object.keys(RoomManager.players);

            for (let i = 0; i < socketIds.length; i++) {
                if (RoomManager.players[socketIds[i]].createdAt <= date)
                    delete RoomManager.players[socketIds[i]];
            }
        })
    }

}

module.exports = CronManager;
