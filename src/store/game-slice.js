import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";

export const initGameState = { stage: C.GAME_STAGE_NEW, players: [], roundNum: 0, kitty: { cards: [] } };

export const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op`);
    },
    newGame(state, action) {
      // const obj = state.payload;
      // const config = obj.config;
      state.stage = C.GAME_STAGE_IN_PROGRESS;
    },
  },
});

export const gameActions = gameSlice.actions;
