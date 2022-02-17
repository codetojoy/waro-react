import { configureStore } from "@reduxjs/toolkit";

import { configSlice } from "./config-slice.js";
import { gameSlice } from "./game-slice.js";
import { uiSlice } from "./ui-slice.js";

// store

export const store = configureStore({
  reducer: { config: configSlice.reducer, game: gameSlice.reducer, ui: uiSlice.reducer },
});
