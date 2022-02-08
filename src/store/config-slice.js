import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";

export const initConfigState = {
  players: [
    { name: "Chopin", strategy: C.STRATEGY_NEXT_CARD, numGamesWon: 0, cards: [], numPointsForRound: 0 },
    { name: "Mozart", strategy: C.STRATEGY_NEXT_CARD, numGamesWon: 0, cards: [], numPointsForRound: 0 },
    { name: C.PLAYER_USERNAME, strategy: C.STRATEGY_UI, numGamesWon: 0, cards: [], numPointsForRound: 0 },
  ],
  numCards: 32,
};

export const configSlice = createSlice({
  name: "config",
  initialState: initConfigState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op. state:`);
      console.log(state);
    },
    setNumCards(state, action) {
      const obj = action.payload;
      state.numCards = obj.numCards;
    },
    playerWinsGame(state, action) {
      const obj = action.payload;
      const name = obj.name;
      const player = state.players.find((p) => p.name === name);
      player.numGamesWon += 1;
    },
  },
});

export const configActions = configSlice.actions;
