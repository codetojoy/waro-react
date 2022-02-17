import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";

import { getPartitionedHands } from "../Functions/dealer";

export const initGameState = {
  status: "new game",
  stage: C.GAME_STAGE_NEW,
  players: [],
  roundNum: 0,
  kitty: { cards: [] },
  gameWinnerName: "",
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
    updateStateForRound(state, action) {
      const obj = action.payload;
      if (obj.kittyCards) {
        state.kitty.cards = obj.kittyCards;
      }
      if (obj.players) {
        state.players = obj.players;
      }
      if (obj.stage) {
        state.stage = obj.stage;
      }
      if (obj.gameWinnerName) {
        state.gameWinnerName = obj.gameWinnerName;
      }
    },
    newGame(state, action) {
      const obj = action.payload;
      const config = obj.config;
      state.players = buildPlayers(config);
      const numCards = config.numCards;
      const hands = getPartitionedHands(numCards, config.players.length);
      state.kitty.cards = hands[0];
      for (let i = 1; i < hands.length; i++) {
        const playerIndex = i - 1;
        const player = state.players[playerIndex];
        player.cards = hands[i];
      }
      state.stage = C.GAME_STAGE_IN_PROGRESS;
      state.gameWinnerName = "";
    },
  },
});

export const gameActions = gameSlice.actions;
