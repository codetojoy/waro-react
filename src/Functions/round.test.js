import * as R from "./round";

import * as C from "../C";

describe("round service", () => {
  const prizeCard = 10;
  const cards = [55, 44, 22, 11, 33];
  const p1 = { name: "mozart", cards: [18, 15, 11], strategy: C.STRATEGY_NEXT_CARD, numPointsForRound: 0 };
  const p2 = { name: "chopin", cards: [28, 25, 20], strategy: C.STRATEGY_NEXT_CARD, numPointsForRound: 0 };
  const p3 = { name: "bach", cards: [38, 35, 30], strategy: C.STRATEGY_NEXT_CARD, numPointsForRound: 0 };
  const bid1 = { name: "mozart", bidValue: 11 };
  const bid2 = { name: "chopin", bidValue: 20 };
  const bid3 = { name: "bach", bidValue: 30 };

  test("should apply bids", () => {
    // test
    const players = R.applyBids([p1, p2, p3], [bid1, bid2, bid3]);

    expect(players[0].name).toEqual(p1.name);
    expect(players[1].name).toEqual(p2.name);
    expect(players[2].name).toEqual(p3.name);

    expect(players[0].cards).toEqual([18, 15]);
    expect(players[1].cards).toEqual([28, 25]);
    expect(players[2].cards).toEqual([38, 35]);
  });

  test("should apply round to winner", () => {
    // test
    const players = R.applyRound([p1, p2, p3], p2.name, prizeCard);

    expect(players[0].name).toEqual(p1.name);
    expect(players[1].name).toEqual(p2.name);
    expect(players[2].name).toEqual(p3.name);

    expect(players[1].numPointsForRound).toEqual(prizeCard);
  });

  test("should award prize to winner", () => {
    // test
    const newPlayer = R.winsRound(p2, prizeCard);

    expect(newPlayer.name).toEqual(p2.name);
    expect(newPlayer.numPointsForRound).toEqual(prizeCard);
  });

  test("should find winner in bids", () => {
    // test
    const winner = R.findWinner([bid1, bid2, bid3]);

    expect(winner).toEqual(bid3.name);
  });
});
