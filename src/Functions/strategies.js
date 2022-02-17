import * as C from "../C";

export const getBids = async (players, prizeCard) => {
  let bids = [];
  const promises = players.map((p) => {
    const name = p.name;
    const cards = p.cards;
    return getBidPromise(p, prizeCard).then((card) => {
      const bidValue = card;
      const newCards = cards.filter((c) => c !== bidValue);
      const bid = { name, bidValue, newCards };
      return bid;
    });
  });
  await Promise.all(promises).then((values) => {
    values.forEach((bid) => {
      bids.push(bid);
    });
  });
  return bids;
};

export const getBidPromise = (player, prizeCard) => {
  const strategy = getStrategy(player.strategy);
  const promise = strategy(player.cards, prizeCard);
  return promise;
};

/*
export const getBid = (player, prizeCard) => {
  const strategy = getStrategy(player.strategy);
  if (typeof strategy !== "function") {
    throw new Error("internal error on strategy");
  }
  const bidValue = await strategy(player.cards, prizeCard);
  const newCards = player.cards.filter((c) => c !== bidValue);
  const name = player.name;
  return { name, bidValue, newCards };
};
*/

export const getStrategy = (strategyName) => {
  if (strategyName === C.STRATEGY_NEXT_CARD) {
    return nextCard;
  } else if (strategyName === C.STRATEGY_REMOTE) {
    return nextCard; // remoteCard;
  }
};

/*
export const nextCard = (cards, prizeCard) => {
  return cards[0];
};
*/

export const nextCard = (cards, prizeCard) => {
  const value = cards[0];
  console.log(`TRACER nextCard value: ${value}`);
  const promise = new Promise((res, rej) => res(value));
  return promise;
};

/*
export const remoteCard = async (cards, prizeCard) => {
  // TODO: extract these magic values
  // "http://localhost:8080/waro/strategy?prize_card=10&max_card=12&mode=max&cards=4&cards=6&cards=2&delay_in_seconds=5" | jq
  const server = "http://localhost:8080";
  const context = "waro/strategy";
  const params = {
    prize_card: prizeCard,
    mode: "max",
    max_card: 32,
    delay_in_seconds: 5,
  };
  const urlSearchParams = new URLSearchParams(params);
  cards.forEach((card) => {
    urlSearchParams.append("cards", card);
  });
  const uri = new URL(`${server}/${context}`);
  uri.search = urlSearchParams.toString();

  const response = await fetch(uri);

  if (response.ok) {
    const json = await response.json();
    console.log(`TRACER remoteCard m: ${json.message}`);
    return json.card;
  } else {
    console.log(`TRACER INTERNAL ERROR on fetch card`);
  }
};
*/
