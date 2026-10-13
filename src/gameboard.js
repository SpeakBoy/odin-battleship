import Ship from "./ship.js";

class Gameboard {
    #board = Array.from({length: Gameboard.rows}, () => new Array(Gameboard.columns).fill(null));
    #attacked = Array.from({length: Gameboard.rows}, () => new Array(Gameboard.columns).fill(false));

    placeShip(x, y, length) {
        if (x + (length - 1) >= Gameboard.rows || x < 0) {
            throw new RangeError("x coordinate out of bounds!");
        }
        if (y >= Gameboard.columns || y < 0) {
            throw new RangeError("y coordinate out of bounds!");
        }

        const shipToPlace = new Ship(length);
        let i = 0;
        while (i < length) {
            this.#board[x + i][y] = shipToPlace;
            i++;
        }
    }

    receiveAttack(x, y) {
        if (x >= Gameboard.rows || x < 0) {
            throw new RangeError("x coordinate out of bounds!");
        }
        if (y >= Gameboard.columns || y < 0) {
            throw new RangeError("y coordinate out of bounds!");
        }
        if (this.#attacked[x][y]) {
            return "attacked prior";
        }
        this.#attacked[x][y] = true;
        if (this.#board[x][y] && this.#board[x][y] !== "missed") {
            this.#board[x][y].hit();
            return "hit";
        } else {
            this.#board[x][y] = "missed";
            return "missed";
        }
    }

    allShipsSunk() {
        for (const row of this.#board) {
            for (const square of row) {
                if (square && square !== "missed" && !square.isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }

    static get rows() {
        return 10;
    }

    static get columns() {
        return 10;
    }
}

export default Gameboard;