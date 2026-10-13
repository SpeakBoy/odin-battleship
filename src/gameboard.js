import Ship from "./ship.js";

class Gameboard {
    #board = Array.from({length: Gameboard.rows}, () => new Array(Gameboard.columns).fill(null));
    #attacked = Array.from({length: Gameboard.rows}, () => new Array(Gameboard.columns).fill(false));
    #ships = [];

    placeShip(x, y, length) {
        if (x + (length - 1) >= Gameboard.rows || x < 0) {
            throw new RangeError("x coordinate out of bounds!");
        }
        if (y >= Gameboard.columns || y < 0) {
            throw new RangeError("y coordinate out of bounds!");
        }
        
        // Check if ship exists in placement tiles.
        let i = 0;
        while (i < length) {
            if (this.#board[x + i][y]) {
                throw new Error(`ship already exists at (${x + i}, ${y})!`);
            }
            i++;
        }
        // Place ship.
        const shipToPlace = new Ship(length);
        this.#ships.push(shipToPlace);
        let j = 0;
        while (j < length) {
            this.#board[x + j][y] = shipToPlace;
            j++;
        }
        return 0;
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
        for (const ship of this.#ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    get numShips() {
        return this.#ships.length;
    }

    static get rows() {
        return 10;
    }

    static get columns() {
        return 10;
    }
}

export default Gameboard;