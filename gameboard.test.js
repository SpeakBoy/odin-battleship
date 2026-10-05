import Gameboard from "./gameboard";

test("gameboard exists", () => {
    expect(new Gameboard()).toBeInstanceOf(Gameboard);
});