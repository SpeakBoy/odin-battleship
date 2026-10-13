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

    static createPlaceShipForm(formContainer) {
        const header = document.createElement("p");
        header.textContent = "Place Ship:";

        const form = document.createElement("form");

        const lengthDiv = document.createElement("div");

        const lengthLabel = document.createElement("label");
        lengthLabel.for = "length";
        lengthLabel.textContent = "Length:";

        const lengthInput = document.createElement("input");
        lengthInput.id = "length";
        lengthInput.name = "length";
        lengthInput.type = "number";
        lengthInput.readOnly = true;

        lengthDiv.appendChild(lengthLabel);
        lengthDiv.appendChild(lengthInput);

        const xDiv = document.createElement("div");

        const xLabel = document.createElement("label");
        xLabel.for = "x";
        xLabel.textContent = "X:";

        const xInput = document.createElement("input");
        xInput.id = "x";
        xInput.name = "x";
        xInput.type = "number";
        xInput.min = 0;
        xInput.max = 9;
        xInput.required = true;

        xDiv.appendChild(xLabel);
        xDiv.appendChild(xInput);

        const yDiv = document.createElement("div");

        const yLabel = document.createElement("label");
        yLabel.for = "y";
        yLabel.textContent = "Y:";

        const yInput = document.createElement("input");
        yInput.id = "y";
        yInput.name = "y";
        yInput.type = "number";
        yInput.min = 0;
        yInput.max = 9;
        yInput.required = true;

        yDiv.appendChild(yLabel);
        yDiv.appendChild(yInput);

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Confirm";
        
        form.appendChild(lengthDiv);
        form.appendChild(xDiv);
        form.appendChild(yDiv);
        form.appendChild(submitButton);

        const errorDisplay = document.createElement("span");
        errorDisplay.id = "error";
        errorDisplay.style.color = "red";

        formContainer.appendChild(header);
        formContainer.appendChild(form);
        formContainer.appendChild(errorDisplay);
        
        return form;
    }

    static removePlaceShipForm(formContainer) {
        formContainer.replaceChildren();
    }

    static displayPlacedShip(board, x, y, length) {
        let i = 0;
        while (i < length) {
            const tile = board.children[(x + i) * Gameboard.rows + y];
            tile.classList.add("placed");
            i++;
        }
    }
    
    static removePlacedShipDisplay(board) {
        [...board.children].forEach(tile => tile.classList.remove("placed"));
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