import { createSlice, current } from "@reduxjs/toolkit";

import * as C from "../C";
import * as Log from "../Log";

import { getPartitionedHands } from "../Functions/dealer";

import * as Strategy from "../Functions/strategies";
import * as Round from "../Functions/round";

export const initGameState = {
  status: "new game",
  stage: C.GAME_STAGE_NEW,
  players: [],
  roundNum: 0,
  kitty: { cards: [] },
};

const buildPlayers = (config) => {
  const players = config.players.map((playerConfig) => {
    return { ...playerConfig };
  });
  return players;
};

const findPlayer = (allPlayers, targetPlayerName) => {
  let user = null;
  let players = [];
  allPlayers.forEach((player) => {
    if (player.name === targetPlayerName) {
      user = player;
    } else {
      players.push(player);
    }
  });
  return [user, players];
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op`);
    },
    playRound(state, action) {
      const obj = action.payload;
      const userBid = obj.userBid;
      const [user, computerPlayers] = findPlayer(state.players, C.PLAYER_USERNAME);
      const prizeCard = state.kitty.cards[0];
      state.kitty.cards = state.kitty.cards.slice(1);
      const computerBids = Strategy.getBids(computerPlayers, prizeCard);
      const bids = [...computerBids, { name: user.name, bidValue: userBid }];
      const roundWinnerName = Round.findRoundWinner(bids);
      const tmpPlayers1 = Round.applyBids(state.players, bids);
      const tmpPlayers2 = Round.applyRound(tmpPlayers1, roundWinnerName, prizeCard);
      state.players = tmpPlayers2;

      if (state.kitty.cards.length === 0) {
        const gameWinnerName = Round.findGameWinner(state.players);
        // this needs to dispatch to the config-slice
        // const tmpPlayers3 = Round.applyLastRound(state.players, gameWinnerName);
        // state.players = tmpPlayers3;
        state.status = `${gameWinnerName} wins game!`;
        state.stage = C.GAME_STAGE_COMPLETE;
      } else {
        state.status = `${roundWinnerName} wins round for ${prizeCard} points`;
      }
    },
    newGame(state, action) {
      const obj = action.payload;
      const config = obj.config;
      state.players = buildPlayers(config);
      const numCards = config.numCards;
      const hands = getPartitionedHands(numCards, config.players.length);
      for (let i = 0; i < hands.length; i++) {
        const hand = hands[i];
        if (i === 0) {
          state.kitty.cards = hand;
        } else {
          const playerIndex = i - 1;
          const player = state.players[playerIndex];
          player.cards = hand;
        }
      }
      state.stage = C.GAME_STAGE_IN_PROGRESS;
      state.status = "Your turn";
    },
  },
});

export const gameActions = gameSlice.actions;
