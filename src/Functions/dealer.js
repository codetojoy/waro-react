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
