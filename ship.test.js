import Ship from "./ship";

test("ship exists", () => {
    expect(new Ship()).toBeInstanceOf(Ship);
});