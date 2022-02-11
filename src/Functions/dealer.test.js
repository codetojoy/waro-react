import * as dealer from "./dealer";

describe("dealer service", () => {
  const numCards = 60;
  const numCardsPerHand = 12;
  const numHands = numCards / numCardsPerHand;

  test("should build a deck of cards", () => {
    // test
    const cards = dealer.newDeck(numCards);

    expect(cards.length).toEqual(numCards);
  });

  test("should shuffle a deck of cards", () => {
    const seedCards = dealer.newDeck(numCards);
    const seedSum = seedCards.reduce((partialSum, a) => partialSum + a, 0);

    // test
    const cards = dealer.shuffle(seedCards);

    expect(cards.length).toEqual(numCards);
    const sum = seedCards.reduce((partialSum, a) => partialSum + a, 0);
    expect(sum).toEqual(seedSum);
    const numMismatchThreshold = 4;
    let numMismatch = 0;
    for (let i = 0; i < numCards; i++) {
      if (seedCards[i] !== cards[i]) {
        numMismatch++;
      }
    }
    expect(numMismatch).toBeGreaterThan(numMismatchThreshold);
  });

  test("should partition a deck of cards", () => {
    const seedCards = dealer.newDeck(numCards);
    const seedSum = seedCards.reduce((partialSum, a) => partialSum + a, 0);
    const cards = dealer.shuffle(seedCards);

    // test
    const hands = dealer.dealHands(cards, numCardsPerHand);

    expect(hands.length).toEqual(numHands);
    let sum = 0;
    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      expect(hand.length).toEqual(numCardsPerHand);
      sum += hand.reduce((partialSum, a) => partialSum + a, 0);
    }
    expect(sum).toEqual(seedSum);
  });
});
