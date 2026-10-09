import Gameboard from "./gameboard.js";

const winnerTextP = document.querySelector("#winner-text");

class DisplayController {
    static createBoards(playerOneBoard, playerTwoBoard) {
        createBoard(playerOneBoard);
        createBoard(playerTwoBoard);

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
    }

    static updateMissedTile(tile) {
        tile.textContent = "•";
        tile.classList.add("missed");
    }

    static disableBoard(board) {
        board.classList.add("disabled");
    }

    static enableBoard(board) {
        board.classList.remove("disabled");
    }

    static displayWinner(winner) {
        winnerTextP.textContent = `${winner} has won! Congratulations!`;
    }
}

export default DisplayController;