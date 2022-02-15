import * as S from "./strategies";

import * as C from "../C";

describe("strategy service", () => {
  const prizeCard = 10;
  const cards = [55, 44, 22, 11, 33];
  const p1 = { name: "mozart", cards: [18, 15, 11], strategy: C.STRATEGY_NEXT_CARD };
  const p2 = { name: "chopin", cards: [28, 25, 20], strategy: C.STRATEGY_NEXT_CARD };
  const p3 = { name: "bach", cards: [38, 35, 30], strategy: C.STRATEGY_NEXT_CARD };

  test("should get bids from players", () => {
    // test
    const bids = S.getBids([p1, p2, p3], prizeCard);

    expect(bids[0].name).toEqual(p1.name);
    expect(bids[0].bidValue).toEqual(18);
    expect(bids[0].newCards).toEqual([15, 11]);

    expect(bids[1].name).toEqual(p2.name);
    expect(bids[1].bidValue).toEqual(28);
    expect(bids[1].newCards).toEqual([25, 20]);

    expect(bids[2].name).toEqual(p3.name);
    expect(bids[2].bidValue).toEqual(38);
    expect(bids[2].newCards).toEqual([35, 30]);
  });

  test("should get bid from a player", () => {
    // test
    const bid = S.getBid(p1, prizeCard);

    expect(bid.name).toEqual(p1.name);
    expect(bid.bidValue).toEqual(18);
    expect(bid.newCards).toEqual([15, 11]);
  });

  test("select next-card strategy", () => {
    // test
    const result = S.getStrategy(C.STRATEGY_NEXT_CARD);

    expect(result).toEqual(S.nextCard);
  });

  test("provide basic next-card strategy", () => {
    // test
    const result = S.nextCard(cards, prizeCard);

    expect(result).toEqual(55);
  });
});
