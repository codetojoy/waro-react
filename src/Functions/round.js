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

export const findRoundWinner = (bids) => {
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

export const findGameWinner = (players) => {
  let winner = null;
  let topScore = -1;
  players.forEach((player) => {
    const score = player.numPointsForRound;
    if (score > topScore) {
      winner = player.name;
      topScore = score;
    }
  });
  return winner;
};

export const winsRound = (player, prizeCard) => {
  const numPointsForRound = player.numPointsForRound + prizeCard;
  const newPlayer = { ...player, numPointsForRound };
  return newPlayer;
};

/*
export const winsGame = (player) => {
  const numPointsForRound = player.numPointsForRound + prizeCard;
  const newPlayer = { ...player, numPointsForRound };
  return newPlayer;
};
*/
