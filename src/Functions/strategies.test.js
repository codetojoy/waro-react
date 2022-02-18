import * as S from "./strategies";

import * as C from "../C";

describe("strategy service", () => {
  const maxCard = 60;
  const prizeCard = 10;
  const cards = [55, 44, 22, 11, 33];
  const p1 = { name: "mozart", cards: [18, 15, 11], strategy: C.STRATEGY_NEXT_CARD };
  const p2 = { name: "chopin", cards: [28, 25, 20], strategy: C.STRATEGY_NEXT_CARD };
  const p3 = { name: "bach", cards: [38, 35, 30], strategy: C.STRATEGY_NEXT_CARD };

  test("should get bids from players", async () => {
    // test
    const bids = await S.getBids([p1, p2, p3], prizeCard, maxCard);

    expect(bids.length).toEqual(3);
    let bidValue1,
      bidValue2,
      bidValue3 = null;
    let bidCards1,
      bidCards2,
      bidCards3 = null;
    bids.forEach((bid) => {
      if (bid.name === p1.name) {
        bidValue1 = bid.bidValue;
        bidCards1 = bid.newCards;
      } else if (bid.name === p2.name) {
        bidValue2 = bid.bidValue;
        bidCards2 = bid.newCards;
      } else if (bid.name === p3.name) {
        bidValue3 = bid.bidValue;
        bidCards3 = bid.newCards;
      } else {
        throw new Error("internal error");
      }
    });
    expect(bidValue1).toEqual(18);
    expect(bidCards1).toEqual([15, 11]);

    expect(bidValue2).toEqual(28);
    expect(bidCards2).toEqual([25, 20]);

    expect(bidValue3).toEqual(38);
    expect(bidCards3).toEqual([35, 30]);
  });

  test("select next-card strategy", () => {
    // test
    const result = S.getStrategy(C.STRATEGY_NEXT_CARD);

    expect(result).toEqual(S.nextCard);
  });

  test("select remote strategy", () => {
    // test
    const result = S.getStrategy(C.STRATEGY_REMOTE);

    expect(result).toEqual(S.remoteCard);
  });

  test("provide basic next-card strategy", async () => {
    // test
    const promise = S.nextCard(p1.cards, prizeCard, maxCard);
    let result = null;
    await Promise.all([promise]).then((values) => {
      values.forEach((value) => {
        result = value;
      });
    });

    expect(result).toEqual(18);
  });

  // integration test: requires server to be running
  test("provide basic remote strategy", async () => {
    let result = 55;
    const enabled = false;

    if (enabled) {
      // test
      const promise = S.remoteCard(cards, prizeCard, maxCard);
      await Promise.all([promise]).then((values) => {
        values.forEach((value) => {
          result = value;
        });
      });
    }

    expect(result).toEqual(55);
  });
});
