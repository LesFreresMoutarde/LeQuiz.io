class GameMode {
    constructor(){

    }

    getWinCondition(){
        return true;
    }
}

class Serie extends GameMode{
    constructor(){
        super()
    }

    getWinCondition(){
        return true;
    }
}
class Blitz  extends GameMode{
    constructor() {
        super()
    }

    getWinCondition(){
        return true;
    }
}

class Ascension extends  GameMode{
    constructor() {
        super()
    }

    getWinCondition(){
        return true;
    }
}

class Survivant extends GameMode{
    constructor(){
        super()
    }

    getWinCondition(){
        return true;
    }
}