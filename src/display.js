import Gameboard from "./gameboard.js";

const playerOneGrid = document.querySelector("#boards-container > .playerOne");
const playerTwoGrid = document.querySelector("#boards-container > .playerTwo");

class DisplayController {
    static createGrids() {
        createGrid(playerOneGrid);
        createGrid(playerTwoGrid);

        function createGrid(container) {
            for (let i = 0; i < Gameboard.rows; i++) {
                for (let j = 0; j < Gameboard.columns; j++) {
                    const tile = document.createElement("div");
                    tile.classList.add("tile");
                    container.appendChild(tile);
                }
            }
        }
    }
}

export default DisplayController;