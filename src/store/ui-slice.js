import { createSlice } from "@reduxjs/toolkit";

export const initUiState = {
  status: "pending",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initUiState,
  reducers: {
    updateStatus(state, action) {
      state.status = action.payload.status;
      console.log(`TRACER ui slice: ${state.status}`);
    },
  },
});

export const uiActions = uiSlice.actions;
