import Gameboard from "./gameboard";

test("gameboard exists", () => {
    expect(new Gameboard()).toBeInstanceOf(Gameboard);
});

test("placeShip: x coordinate out of bounds throws RangeError", () => {
    const gameBoard = new Gameboard();
    expect(() => gameBoard.placeShip(15, 0, 3)).toThrow(RangeError);
    expect(() => gameBoard.placeShip(-5, 0, 2)).toThrow(RangeError);
});

test("placeShip: y coordinate out of bounds throws RangeError", () => {
    const gameBoard = new Gameboard();
    expect(() => gameBoard.placeShip(0, 15, 3)).toThrow(RangeError);
    expect(() => gameBoard.placeShip(0, -5, 2)).toThrow(RangeError);
});

test("receiveAttack: x coordinate out of bounds throws RangeError", () => {
    const gameBoard = new Gameboard();
    expect(() => gameBoard.receiveAttack(15, 0)).toThrow(RangeError);
    expect(() => gameBoard.receiveAttack(-5, 0)).toThrow(RangeError);
});

test("receiveAttack: y coordinate out of bounds throws RangeError", () => {
    const gameBoard = new Gameboard();
    expect(() => gameBoard.receiveAttack(0, 15)).toThrow(RangeError);
    expect(() => gameBoard.receiveAttack(0, -5)).toThrow(RangeError);
});