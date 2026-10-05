import Gameboard from "./gameboard.js";

class Player {
    gameboard = new Gameboard();

    constructor(type = "real") {
        this.type = type;
    }
}

export default Player;