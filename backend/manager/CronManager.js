const cron = require('node-cron');
const RoomManager = require('./RoomManager');

class CronManager {

    static executeCronTasks = () => {
        CronManager.removeDirtyRooms();
        C
    }


    static removeDirtyRooms = () => {

        cron.schedule('0 3 * * *', () => {

            const date = new Date();
            date.setDate(date.getDate() - 1);

            const indexesToDelete = [];

            RoomManager.rooms.forEach((room, index) => {
                if (room.createdAt <= date && room.players.length === 0) indexesToDelete.push(index);
            })

            for (let i = indexesToDelete.length - 1; i >= 0; i--) {
                RoomManager.rooms.splice(indexesToDelete[i], 1)
            }

        })
    }

    static removeDirtyPlayers = () => {
        cron.schedule('0 3 * * *', () => {

            const date = new Date();
            date.setDate(date.getDate() - 1);

            const indexesToDelete = [];

            RoomManager.players.forEach((player, index) => {
                if (player.createdAt <= date) indexesToDelete.push(index);
            })

            for (let i = indexesToDelete.length - 1; i >= 0; i--) {
                RoomManager.players.splice(indexesToDelete[i], 1)
            }

        })
    }

}

module.exports = CronManager;
