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
        this.#populateGameBoards();
        // Event listeners are only necessary for a board if the opposing player is not a computer, 
        // otherwise attacks are done programatically.
        if (this.#playerTwo.type !== "computer") {
            this.#addHitEventListeners(playerOneBoard, this.#playerOne.gameboard);
        }
        if (this.#playerOne.type !== "computer") {
            this.#addHitEventListeners(playerTwoBoard, this.#playerTwo.gameboard);
        }
        this.#switchCurrentTurn();
    }
    
    #switchCurrentTurn() {
        if (this.#currentTurn === "p1") {
            this.#currentTurn = "p2";
            DisplayController.disableBoard(playerTwoBoard);
            if (this.#playerTwo.type === "computer") {
                this.#playComputerTurn(playerOneBoard, this.#playerOne.gameboard);
                return;
            }
            DisplayController.enableBoard(playerOneBoard);
        } else {
            this.#currentTurn = "p1";
            DisplayController.disableBoard(playerOneBoard);
            if (this.#playerOne.type === "computer") {
                this.#playComputerTurn(playerTwoBoard, this.#playerTwo.gameboard);
                return;
            }
            DisplayController.enableBoard(playerTwoBoard);
        }
    }

    #populateGameBoards() {
        this.#playerOne.gameboard.placeShip(0, 0, 3);
        this.#playerOne.gameboard.placeShip(5, 5, 4);
        
        this.#playerTwo.gameboard.placeShip(2, 2, 3);
        this.#playerTwo.gameboard.placeShip(6, 4, 2);
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
        DisplayController.disableBoard(playerOneBoard);
        DisplayController.disableBoard(playerTwoBoard);
        DisplayController.displayWinner(this.#currentTurn);
    }
}

const game = new GameController();
game.init();