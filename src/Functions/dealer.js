export const newDeck = (numCards) => {
  let cards = [];
  for (let i = 1; i <= numCards; i++) {
    cards.push(i);
  }
  return cards;
};

export const shuffle = (cards) => {
  let newCards = cards.slice();
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newCards[i];
    newCards[i] = newCards[j];
    newCards[j] = temp;
  }
  return newCards;
};

// TODO: ugh, better name
export const getPartitionedHands = (numCards, numPlayers) => {
  const cards = shuffle(newDeck(numCards));
  const numCardsInHand = numCards / (numPlayers + 1);
  const hands = dealHands(cards, numCardsInHand);
  return hands;
};

export const dealHands = (cards, numCardsInHand) => {
  const hands = [];

  for (let i = 0, j = cards.length; i < j; i += numCardsInHand) {
    let hand = cards.slice(i, i + numCardsInHand);
    hands.push(hand);
  }

  return hands;
};
