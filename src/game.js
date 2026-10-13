import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DisplayController from "./display.js";
import "./styles.css";

const p1Board = document.querySelector("#player-one > .board");
const p2Board = document.querySelector("#player-two > .board");
const p1PlaceShipsContainer = document.querySelector("#player-one > .place-ships");
const p2PlaceShipsContainer = document.querySelector("#player-two > .place-ships");

class GameController {
    #p1 = new Player();
    #p2 = new Player();
    #currentTurn = null;

    init() {
        DisplayController.createBoards(p1Board, p2Board);
        DisplayController.displayBoardHeaders();

        if (this.#p1.type !== "computer") {
            this.#placePlayerShips(this.#p1, p1Board, p1PlaceShipsContainer);
        } else {
            this.#placeComputerShips(this.#p1);
            if (this.#p2.type !== "computer") {
                this.#placePlayerShips(this.#p2, p2Board, p2PlaceShipsContainer)
            } else {
                this.#placeComputerShips(this.#p2);
                this.#initPlay();
            }
        }
    }

    #initPlay() {
        // Event listeners are only necessary for a board if the opposing player is not a computer, 
        // otherwise attacks are done programatically.
        if (this.#p1.type !== "computer") {
            this.#addHitEventListeners(p2Board, this.#p2.gameboard);
        }
        if (this.#p2.type !== "computer") {
            this.#addHitEventListeners(p1Board, this.#p1.gameboard);
        }

        this.#switchCurrentTurn();
    }

    #placePlayerShips(player, board, formContainer) {
        const shipLengthsToPlace = [2, 3, 3, 4, 5];
        const form = DisplayController.createPlaceShipForm(formContainer);
        const lengthInput = document.querySelector("#length");
        lengthInput.value = shipLengthsToPlace.pop(); 
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const x = +document.querySelector("#x").value;
            const y = +document.querySelector("#y").value;
            const errorMessage = document.querySelector("#error");

            try {
                player.gameboard.placeShip(x, y, lengthInput.value);
                DisplayController.displayPlacedShip(board, x, y, lengthInput.value);
                form.reset();
                errorMessage.textContent = "";
                if (player.gameboard.numShips === 5) {
                    DisplayController.removePlaceShipForm(formContainer);
                    DisplayController.removePlacedShipDisplay(board);
                    if (player === this.#p1) {
                        if (this.#p2.type !== "computer") {
                            return this.#placePlayerShips(this.#p2, p2Board, p2PlaceShipsContainer);
                        } else {
                            this.#placeComputerShips(this.#p2);
                            return this.#initPlay();
                        }
                    } else {
                        return this.#initPlay();
                    }

                }
                lengthInput.value = shipLengthsToPlace.pop();
            }
            catch (error) {
                errorMessage.textContent = error.message;
            }
        });
    }

    #placeComputerShips(player) {
        const shipLengthsToPlace = [2, 3, 3, 4, 5];
        while (player.gameboard.numShips < 5) {
            let currentLength = null;
            try {
                currentLength = shipLengthsToPlace.pop();
                const randomX = Math.floor(Math.random() * Gameboard.rows);
                const randomY = Math.floor(Math.random() * Gameboard.columns);
                player.gameboard.placeShip(randomX, randomY, currentLength);
            }
            catch {
                shipLengthsToPlace.push(currentLength);
            }
        }
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

    async #playComputerTurn(board, gameboard) {
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
        await this.#sleep(50);
        this.#switchCurrentTurn();
    }

    #sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    #endGame() {
        DisplayController.disableBoard(p1Board);
        DisplayController.disableBoard(p2Board);
        DisplayController.displayWinner(this.#currentTurn);
    }
}

const game = new GameController();
game.init();