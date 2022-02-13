import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";
import * as Log from "../Log";

import { getPartitionedHands } from "../Functions/dealer";

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

export const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op`);
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
