import { createSlice } from "@reduxjs/toolkit";

export const initGameState = { players: [], roundNum: 0, kitty: { cards: [] }, cardOnOffer: -1 };

export const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op`);
    },
  },
});

export const gameActions = gameSlice.actions;
