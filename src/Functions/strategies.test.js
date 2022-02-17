import * as S from "./strategies";

import * as C from "../C";

describe("strategy service", () => {
  const prizeCard = 10;
  const cards = [55, 44, 22, 11, 33];
  const p1 = { name: "mozart", cards: [18, 15, 11], strategy: C.STRATEGY_NEXT_CARD };
  const p2 = { name: "chopin", cards: [28, 25, 20], strategy: C.STRATEGY_NEXT_CARD };
  const p3 = { name: "bach", cards: [38, 35, 30], strategy: C.STRATEGY_NEXT_CARD };

  test("should get bids from players", async () => {
    // test
    const bids = await S.getBids([p1, p2, p3], prizeCard);

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

  /*
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
  test("provide basic next-card strategy", async () => {
    // test
    const promise = S.nextCard(p1.name, p1.cards, prizeCard);
    let name,
      bid,
      cards = null;
    await Promise.all([promise]).then((values) => {
      console.log(`TRACER strategies test cp inner:`);
      const json = values[0];
      console.log(json);
      if (json.bid) {
        name = json.name;
        bid = json.bid;
        cards = json.cards;
      }
    });
    console.log(`TRACER strategies test cp main`);

    expect(name).toEqual(p1.name);
    expect(bid).toEqual(18);
    expect(cards).toEqual(p1.cards);
  });
*/
});
