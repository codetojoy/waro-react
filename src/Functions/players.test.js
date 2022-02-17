import * as P from "./players";

describe("players service", () => {
  const p1 = { name: "mozart" };
  const p2 = { name: "chopin" };
  const p3 = { name: "bach" };

  test("find player by name", () => {
    const players = [p1, p2, p3];
    // test
    const [player, others] = P.findPlayerByName(players, p2.name);

    expect(player.name).toEqual(p2.name);
    expect(others.length).toEqual(2);
  });
});
