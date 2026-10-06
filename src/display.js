import Gameboard from "./gameboard.js";

const playerOneGrid = document.querySelector("#boards-container > .playerOne");
const playerTwoGrid = document.querySelector("#boards-container > .playerTwo");

class DisplayController {
    static createGrids(playerOneBoard, playerTwoBoard) {
        createGrid(playerOneGrid, playerOneBoard);
        createGrid(playerTwoGrid, playerTwoBoard);

        function createGrid(container, gameboard) {
            for (let x = 0; x < Gameboard.rows; x++) {
                for (let y = 0; y < Gameboard.columns; y++) {
                    const tile = document.createElement("div");
                    tile.classList.add("tile");
                    tile.addEventListener("mousedown", () => {
                        const attackResult = gameboard.receiveAttack(x, y);
                        if (attackResult === "hit") {
                            DisplayController.#updateHitTile(tile);
                        } else if (attackResult === "missed") {
                            DisplayController.#updateMissedTile(tile);
                        }
                        tile.style.pointerEvents = "none";
                    });
                    container.appendChild(tile);
                }
            }
        }
    }

    static #updateHitTile(tile) {
        tile.textContent = "X";
        tile.classList.add("hit");
    }

    static #updateMissedTile(tile) {
        tile.textContent = "•";
        tile.classList.add("missed");
    }
}

export default DisplayController;