class Ship {
    #length;
    #hits = 0;

    constructor(length) {
        this.#length = length;
    }

    hit() {
        this.#hits++;
    }

    isSunk() {
        return this.#hits >= this.#length;
    }
}

export default Ship;