import Gameboard from "./gameboard.js";

const statusText = document.querySelector("#status-text");
const p1Header = document.querySelector("#player-one > .header");
const p2Header = document.querySelector("#player-two > .header");

class DisplayController {
    static createBoards(p1Board, p2Board) {
        createBoard(p1Board);
        createBoard(p2Board);

        function createBoard(container) {
            for (let x = 0; x < Gameboard.rows; x++) {
                for (let y = 0; y < Gameboard.columns; y++) {
                    const tile = document.createElement("div");
                    tile.classList.add("tile");
                    container.appendChild(tile);
                }
            }
        }
    }

    static updateHitTile(tile) {
        tile.textContent = "X";
        tile.classList.add("hit");
        tile.classList.add("disabled");
    }

    static updateMissedTile(tile) {
        tile.textContent = "•";
        tile.classList.add("missed");
        tile.classList.add("disabled");
    }

    static disableBoard(board) {
        board.classList.add("disabled");
    }

    static enableBoard(board) {
        board.classList.remove("disabled");
    }

    static displayBoardHeaders() {
        p1Header.textContent = "p1's Board";
        p2Header.textContent = "p2's Board";
    }

    static displayCurrentTurn(currentTurn) {
        statusText.textContent = `It is currently ${currentTurn}'s turn to attack their opponent's board!`;
    }

    static displayWinner(winner) {
        statusText.textContent = `${winner} has won! Congratulations!`;
    }
}

export default DisplayController;