import Ship from "./ship";

class Gameboard {
    #rows = 10;
    #columns = 10;
    #grid = Array.from({length: this.#rows}, () => new Array(this.#columns).fill(null));

    placeShip(x, y, length) {
        if (x + length >= this.#columns || x < 0) {
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
}

export default Gameboard;