import { configureStore } from "@reduxjs/toolkit";

import { gameSlice } from "./game-slice.js";
import { configSlice } from "./config-slice.js";

// store

export const store = configureStore({
  reducer: { game: gameSlice.reducer, config: configSlice.reducer },
});
