import Gameboard from "./gameboard";

class Player {
    gameboard = new Gameboard();

    constructor(type = "real") {
        this.type = type;
    }
}

export default Player;