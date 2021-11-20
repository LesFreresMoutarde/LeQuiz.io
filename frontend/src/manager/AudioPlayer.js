class AudioPlayer {

    static players = {};

    static sounds = {
        badAnswer: {
            path: '/sounds/bad_answer.wav'
        },
        endGame: {
            path: '/sounds/end_game.wav'
        },
        enterRoom: {
            path: '/sounds/enter_room.wav'
        },
        goodAnswer: {
            path: '/sounds/good_answer.wav'
        },
        leaveRoom: {
            path: '/sounds/leave_room.wav'
        },
        sendAnswer: {
            path: '/sounds/send_answer.wav',
            interruptedBy: ['goodAnswer', 'badAnswer', 'endGame']
        },
        startGame: {
            path: '/sounds/start_game.wav'
        },
        timer: {
            path: '/sounds/timer.wav',
            interruptedBy: ['goodAnswer', 'badAnswer', 'endGame']
        },
    };

    static initiatePlayer = () => {
        const playerName = `player-${Date.now()}`

        AudioPlayer.players[playerName] = new Audio();

        return playerName;
    }

    static playSound = (soundName) => {
        const playerName = AudioPlayer.getPlayer(soundName);

        AudioPlayer.players[playerName].src = AudioPlayer.sounds[soundName].path;

        AudioPlayer.players[playerName].soundName = soundName;

        AudioPlayer.players[playerName].play()
            .then(() => {
                AudioPlayer.players[playerName].addEventListener('pause', () => {
                    delete AudioPlayer.players[playerName];
                });

                AudioPlayer.players[playerName].addEventListener('abort', () => {
                    delete AudioPlayer.players[playerName];
                });
            })
            .catch(() => {
                delete AudioPlayer.players[playerName];
            })
        ;
    }

    static getPlayer = (soundName) => {
        const players = Object.entries(AudioPlayer.players);

        // No players currently in use
        if (players.length === 0) return AudioPlayer.initiatePlayer();

        players.forEach(([playerName, player]) => {
            // Check if player is playing a sound and if this sound has to be interrupted by the next one
            if (!player.paused
                && AudioPlayer.sounds[player.soundName].hasOwnProperty('interruptedBy')
                && AudioPlayer.sounds[player.soundName].interruptedBy.includes(soundName)
            ) {
                // Will trigger player's 'pause' event
                AudioPlayer.players[playerName].pause();
            }
        })

        return AudioPlayer.initiatePlayer();
    }

    static killPlayers = () => {
        Object.keys(AudioPlayer.players).forEach(playerName => AudioPlayer.players[playerName].pause());
    }
}

export default AudioPlayer;
