import * as C from "../C";

export const getBids = async (players, prizeCard, maxCard) => {
  let bids = [];
  const promises = players.map((p) => {
    const name = p.name;
    const cards = p.cards;
    return getBidPromise(p, prizeCard, maxCard).then((card) => {
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

export const getBidPromise = (player, prizeCard, maxCard) => {
  const strategy = getStrategy(player.strategy);
  const promise = strategy(player.cards, prizeCard, maxCard);
  return promise;
};

export const getStrategy = (strategyName) => {
  if (strategyName === C.STRATEGY_NEXT_CARD) {
    return nextCard;
  } else if (strategyName === C.STRATEGY_REMOTE) {
    return remoteCard;
  }
};

export const nextCard = (cards, prizeCard) => {
  const value = cards[0];
  console.log(`TRACER nextCard value: ${value}`);
  const promise = new Promise((res, rej) => res(value));
  return promise;
};

// e.g. https://github.com/codetojoy/WarO_Strategy_Api_Java

export const remoteCard = async (cards, prizeCard, maxCard) => {
  // TODO: extract these magic values
  // "http://localhost:8080/waro/strategy?prize_card=10&max_card=12&mode=max&cards=4&cards=6&cards=2&delay_in_seconds=5" | jq
  const server = "http://localhost:8080";
  const context = "waro/strategy";
  const mode = "max";
  const pathologicalDelayInSeconds = 3;
  const params = {
    prize_card: prizeCard,
    mode: mode,
    max_card: maxCard,
    delay_in_seconds: pathologicalDelayInSeconds,
  };
  const urlSearchParams = new URLSearchParams(params);
  cards.forEach((card) => {
    urlSearchParams.append("cards", card);
  });
  const uri = new URL(`${server}/${context}`);
  uri.search = urlSearchParams.toString();

  return fetch(uri).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        console.log(`TRACER remoteCard m: ${json.message}`);
        return json.card;
      });
    }
  });
};
