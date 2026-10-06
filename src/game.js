import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DisplayController from "./display.js";
import "./styles.css";

class GameController {
    playerOne = new Player();
    playerTwo = new Player("computer");

    init() {
        DisplayController.createGrids(this.playerOne.gameboard, this.playerTwo.gameboard);
    }

    populateGameBoards() {
        this.playerOne.gameboard.placeShip(0, 0, 3);
        this.playerOne.gameboard.placeShip(5, 5, 4);
        
        this.playerTwo.gameboard.placeShip(2, 2, 3);
        this.playerTwo.gameboard.placeShip(6, 4, 2);
    }
}

const game = new GameController();
game.init();
game.populateGameBoards();