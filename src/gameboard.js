import Ship from "./ship.js";

class Gameboard {
    #rows = 10;
    #columns = 10;
    #grid = Array.from({length: this.#rows}, () => new Array(this.#columns).fill(null));

    placeShip(x, y, length) {
        if (x + (length - 1) >= this.#columns || x < 0) {
            throw new RangeError("x coordinate out of bounds!");
        }
        if (y >= this.#rows || y < 0) {
            throw new RangeError("y coordinate out of bounds!");
        }

        const shipToPlace = new Ship(length);
        let i = 0;
        while (i < length) {
            this.#grid[x + i][y] = shipToPlace;
            i++;
        }
    }

    receiveAttack(x, y) {
        if (x >= this.#columns || x < 0) {
            throw new RangeError("x coordinate out of bounds!");
        }
        if (y >= this.#rows || y < 0) {
            throw new RangeError("y coordinate out of bounds!");
        }
        if (this.#grid[x][y] && this.#grid[x][y] !== "missed") {
            this.#grid[x][y].hit();
        } else {
            this.#grid[x][y] = "missed";
        }
    }

    allShipsSunk() {
        for (const row of this.#grid) {
            for (const square of row) {
                if (square && square !== "missed" && !square.isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Gameboard;