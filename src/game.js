import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DisplayController from "./display.js";
import "./styles.css";

const p1Board = document.querySelector("#player-one > .board");
const p2Board = document.querySelector("#player-two > .board");

class GameController {
    #p1 = new Player();
    #p2 = new Player("computer");
    #currentTurn = null;

    init() {
        DisplayController.createBoards(p1Board, p2Board);
        DisplayController.displayBoardHeaders();
        this.#populateGameBoards();
        // Event listeners are only necessary for a board if the opposing player is not a computer, 
        // otherwise attacks are done programatically.
        if (this.#p2.type !== "computer") {
            this.#addHitEventListeners(p1Board, this.#p1.gameboard);
        }
        if (this.#p1.type !== "computer") {
            this.#addHitEventListeners(p2Board, this.#p2.gameboard);
        }
        this.#switchCurrentTurn();
    }
    
    #switchCurrentTurn() {
        if (this.#currentTurn === "p1") {
            this.#currentTurn = "p2";
            DisplayController.disableBoard(p2Board);
            if (this.#p2.type === "computer") {
                this.#playComputerTurn(p1Board, this.#p1.gameboard);
                return;
            }
            DisplayController.enableBoard(p1Board);
        } else {
            this.#currentTurn = "p1";
            DisplayController.disableBoard(p1Board);
            if (this.#p1.type === "computer") {
                this.#playComputerTurn(p2Board, this.#p2.gameboard);
                return;
            }
            DisplayController.enableBoard(p2Board);
        }
        DisplayController.displayCurrentTurn(this.#currentTurn);
    }

    #populateGameBoards() {
        this.#p1.gameboard.placeShip(0, 0, 3);
        this.#p1.gameboard.placeShip(5, 5, 4);
        
        this.#p2.gameboard.placeShip(2, 2, 3);
        this.#p2.gameboard.placeShip(6, 4, 2);
    }

    #addHitEventListeners(board, gameboard) {
        for (let x = 0; x < Gameboard.rows; x++) {
            for (let y = 0; y < Gameboard.columns; y++) {
                const tile = board.children[x * Gameboard.rows + y];
                tile.addEventListener("mousedown", () => {
                    this.#playHumanTurn(tile, gameboard, x, y);
                });
            }
        }
    }

    #getTile(board, x, y) {
        return board.children[x * Gameboard.rows + y];
    }

    #playHumanTurn(tile, gameboard, x, y) {
        const attackResult = gameboard.receiveAttack(x, y);
        if (attackResult === "hit") {
            DisplayController.updateHitTile(tile);
        } else if (attackResult === "missed") {
            DisplayController.updateMissedTile(tile);
        }
        if (gameboard.allShipsSunk()) {
            this.#endGame();
            return;
        }
        this.#switchCurrentTurn();
    }

    #playComputerTurn(board, gameboard) {
        let randomX = null;
        let randomY = null;
        let attackResult = null;
        do {
            randomX = Math.floor(Math.random() * Gameboard.rows);
            randomY = Math.floor(Math.random() * Gameboard.columns);
            attackResult = gameboard.receiveAttack(randomX, randomY); 
        } while (attackResult === "attacked prior");
        const tile = this.#getTile(board, randomX, randomY);
        if (attackResult === "hit") {
            DisplayController.updateHitTile(tile);
        } else if (attackResult === "missed") {
            DisplayController.updateMissedTile(tile);
        }
        if (gameboard.allShipsSunk()) {
            this.#endGame();
            return;
        }
        this.#switchCurrentTurn();
    }

    #endGame() {
        DisplayController.disableBoard(p1Board);
        DisplayController.disableBoard(p2Board);
        DisplayController.displayWinner(this.#currentTurn);
    }
}

const game = new GameController();
game.init();