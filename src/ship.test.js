import Ship from "./ship.js";

test("ship exists", () => {
    expect(new Ship()).toBeInstanceOf(Ship);
});

test("ship of length 4 is sunk after 4 hits", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("ship of length 3 is not sunk after 2 hits", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test("ship of length 4 is not sunk after 1 hit", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test("ship of length 5 is sunk after 6 hits", () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("ship of length 0 is already sunk", () => {
    const ship = new Ship(0);
    expect(ship.isSunk()).toBe(true);
});