import Gameboard from "./gameboard";
import Player from "./player";

test("player exists", () => {
    expect(new Player()).toBeInstanceOf(Player);
});

test("default player has 'real' type", () => {
    const player = new Player();
    expect(player.type).toBe("real");
});

test("'computer' player has 'computer' type", () => {
    const computerPlayer = new Player("computer");
    expect(computerPlayer.type).toBe("computer"); 
});

test("player's gameboard is a gameboard", () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});