// import * as C from "../C";

export const applyBids = (players, bids) => {
  const newPlayers = players.map((p) => {
    const bid = bids.find((b) => b.name === p.name).bidValue;
    const newCards = p.cards.filter((c) => c !== bid);
    const newPlayer = { ...p, cards: newCards };
    return newPlayer;
  });
  return newPlayers;
};

export const applyRound = (players, winnerName, prizeCard) => {
  const newPlayers = players.map((p) => {
    const newPlayer = p.name === winnerName ? winsRound(p, prizeCard) : p;
    return newPlayer;
  });
  return newPlayers;
};

export const findWinner = (bids) => {
  let winner = null;
  let topBid = -1;
  bids.forEach((bid) => {
    const offer = bid.bidValue;
    if (offer > topBid) {
      winner = bid.name;
      topBid = offer;
    }
  });
  return winner;
};

export const winsRound = (player, prizeCard) => {
  const numPointsForRound = player.numPointsForRound + prizeCard;
  const newPlayer = { ...player, numPointsForRound };
  return newPlayer;
};
