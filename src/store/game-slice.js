import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";
import * as Log from "../Log";

import { newDeck, shuffle } from "../Functions/dealer";

export const initGameState = { stage: C.GAME_STAGE_NEW, players: [], roundNum: 0, kitty: { cards: [] } };

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
      const numCards = config.numCards;
      const cards = shuffle(newDeck(numCards));
      Log.logObj("game-slice", cards);
      state.cards = cards;
      state.stage = C.GAME_STAGE_IN_PROGRESS;
    },
  },
});

export const gameActions = gameSlice.actions;
