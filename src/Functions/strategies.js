import * as C from "../C";

export const getBids = (players, prizeCard) => {
  let bids = [];
  players.forEach((player) => {
    const bid = getBid(player, prizeCard);
    bids.push(bid);
  });
  return bids;
};

export const getBid = (player, prizeCard) => {
  const strategy = getStrategy(player.strategy);
  const bidValue = strategy(player.cards, prizeCard);
  const newCards = player.cards.find((c) => c !== bidValue);
  const name = player.name;
  return { name, bidValue, newCards };
};

export const getStrategy = (strategyName) => {
  if (strategyName === C.STRATEGY_NEXT_CARD) {
    return nextCard;
  }
};

export const nextCard = (cards, prizeCard) => {
  return cards[0];
};
