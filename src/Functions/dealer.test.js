import * as dealer from "./dealer";

describe("dealer service", () => {
  const numCards = 60;

  test("should build a deck of cards", () => {
    // test
    const cards = dealer.newDeck(numCards);

    expect(cards.length).toEqual(numCards);
  });
});
