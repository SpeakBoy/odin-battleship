class Ship {
    #length;
    #hits = 0;

    constructor(length) {
        this.#length = length;
    }

    hit() {
        this.#hits++;
    }
}

export default Ship;