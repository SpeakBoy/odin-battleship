import Gameboard from "./gameboard.js";

test("gameboard exists", () => {
    expect(new Gameboard()).toBeInstanceOf(Gameboard);
});

test("placeShip: x coordinate out of bounds throws RangeError", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.placeShip(15, 0, 3)).toThrow(RangeError);
    expect(() => gameboard.placeShip(-5, 0, 2)).toThrow(RangeError);
});

test("placeShip: y coordinate out of bounds throws RangeError", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.placeShip(0, 15, 3)).toThrow(RangeError);
    expect(() => gameboard.placeShip(0, -5, 2)).toThrow(RangeError);
});

test("receiveAttack: x coordinate out of bounds throws RangeError", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(15, 0)).toThrow(RangeError);
    expect(() => gameboard.receiveAttack(-5, 0)).toThrow(RangeError);
});

test("receiveAttack: y coordinate out of bounds throws RangeError", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(0, 15)).toThrow(RangeError);
    expect(() => gameboard.receiveAttack(0, -5)).toThrow(RangeError);
});

test("newly made gameboard has all ships sunk", () => {
    const gameboard = new Gameboard();
    expect(gameboard.allShipsSunk()).toBe(true);
});

test("newly made gameboard with untouched ship does not have all ships sunk", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 1);
    expect(gameboard.allShipsSunk()).toBe(false);
});

test("newly made gameboard with sunk ship has all ships sunk", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 1);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
});