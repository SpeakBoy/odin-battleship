import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DisplayController from "./display.js";
import "./styles.css";

const playerOneBoard = document.querySelector("#boards-container > .playerOne");
const playerTwoBoard = document.querySelector("#boards-container > .playerTwo");

class GameController {
    #playerOne = new Player();
    #playerTwo = new Player("computer");
    #currentTurn = null;

    init() {
        DisplayController.createBoards(playerOneBoard, playerTwoBoard);
        this.#addHitEventListeners(playerOneBoard, this.#playerOne.gameboard);
        this.#addHitEventListeners(playerTwoBoard, this.#playerTwo.gameboard);
        this.switchCurrentTurn();
    }
    
    switchCurrentTurn() {
        if (this.#currentTurn === "p1") {
            this.#currentTurn = "p2";
            DisplayController.disableBoard(playerTwoBoard);
            DisplayController.enableBoard(playerOneBoard);
        } else {
            this.#currentTurn = "p1";
            DisplayController.disableBoard(playerOneBoard);
            DisplayController.enableBoard(playerTwoBoard);
        }
    }

    populateGameBoards() {
        this.#playerOne.gameboard.placeShip(0, 0, 3);
        this.#playerOne.gameboard.placeShip(5, 5, 4);
        
        this.#playerTwo.gameboard.placeShip(2, 2, 3);
        this.#playerTwo.gameboard.placeShip(6, 4, 2);
    }

    #addHitEventListeners(grid, gameboard) {
        for (let x = 0; x < Gameboard.rows; x++) {
            for (let y = 0; y < Gameboard.columns; y++) {
                const tile = grid.children[x * Gameboard.rows + y];
                tile.addEventListener("mousedown", () => {
                    const attackResult = gameboard.receiveAttack(x, y);
                    if (attackResult === "hit") {
                        DisplayController.updateHitTile(tile);
                    } else if (attackResult === "missed") {
                        DisplayController.updateMissedTile(tile);
                    }
                    this.switchCurrentTurn();
                });
            }
        }
    }
}

const game = new GameController();
game.init();
game.populateGameBoards();