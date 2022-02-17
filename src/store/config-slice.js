import { createSlice } from "@reduxjs/toolkit";

import * as C from "../C";

export const initConfigState = {
  players: [
    {
      name: C.PLAYER_1,
      strategy: C.STRATEGY_NEXT_CARD,
      numGamesWon: 0,
      cards: [],
      numPointsForRound: 0,
      currentBid: 0,
      isUser: false,
    },
    {
      name: C.PLAYER_2,
      strategy: C.STRATEGY_NEXT_CARD,
      numGamesWon: 0,
      cards: [],
      numPointsForRound: 0,
      currentBid: 0,
      isUser: false,
    },
    {
      name: C.PLAYER_USERNAME,
      strategy: C.STRATEGY_UI,
      numGamesWon: 0,
      cards: [],
      numPointsForRound: 0,
      currentBid: 0,
      isUser: true,
    },
  ],
  numCards: 12,
  visibleStrategies: [C.STRATEGY_MAX_CARD, C.STRATEGY_MIN_CARD, C.STRATEGY_NEXT_CARD],
  allStrategies: [C.STRATEGY_MAX_CARD, C.STRATEGY_MIN_CARD, C.STRATEGY_NEXT_CARD, C.STRATEGY_UI],
  isTransparent: true,
};

const findPlayerByName = (name, players) => {
  return players.find((p) => p.name === name);
};

export const configSlice = createSlice({
  name: "config",
  initialState: initConfigState,
  reducers: {
    noOp(state, action) {
      console.log(`TRACER game reducer no-op. state:`);
      console.log(state);
    },
    updateTopLevel(state, action) {
      const obj = action.payload;
      console.log(`TRACER config reducer cp ijk ${obj.numCards} ${obj.isTransparent}`);
      state.numCards = obj.numCards;
      state.isTransparent = obj.isTransparent;
    },
    playerWinsGame(state, action) {
      const obj = action.payload;
      const name = obj.name;
      const player = findPlayerByName(name, state.players);
      player.numGamesWon += 1;
    },
    setPlayerStrategy(state, action) {
      const obj = action.payload;
      const name = obj.name;
      const strategy = obj.strategy;
      const player = findPlayerByName(name, state.players);
      player.strategy = strategy;
    },
    setPlayerName(state, action) {
      const obj = action.payload;
      const name = obj.name;
      const newName = obj.newName;
      const player = findPlayerByName(name, state.players);
      player.name = newName;
    },
    newPlayer(state, action) {
      const obj = action.payload;
      const name = obj.name;
      const strategy = obj.strategy;
      const player = {
        name: name,
        strategy: strategy,
        numGamesWon: 0,
        cards: [],
        numPointsForRound: 0,
        currentBid: 0,
        isUser: false,
      };
      state.players.push(player);
      state.numCards = (state.players.length + 1) * C.DEFAULT_CARDS_PER_PLAYER;
    },
  },
});

export const configActions = configSlice.actions;
