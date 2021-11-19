class AudioPlayer {
    static player;

    static sounds = {
        badAnswer: 'sounds/bad_answer.wav',
        endGame: 'sounds/end_game.wav',
        enterRoom: 'sounds/enter_room.wav',
        goodAnswer: 'sounds/good_answer.wav',
        leaveRoom: 'sounds/leave_room.wav',
        sendAnswer: 'sounds/send_answer.wav',
        startGame: 'sounds/start_game.wav',
        timer: 'sounds/timer.wav',
    };

    static initiatePlayer = () => {
        AudioPlayer.player = new Audio();
    }

   static playSound = (soundName) => {
       AudioPlayer.player.src = AudioPlayer.sounds[soundName];
       (async () => {
           await AudioPlayer.player.play();
       })()
   }

   static killPlayer = () => {
       AudioPlayer.player.pause();
       AudioPlayer.player = null;
   }
}

export default AudioPlayer;
