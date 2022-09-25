import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Stock } from "../../interfaces";

const initialState: { selectedStock?: Stock } = {
  selectedStock: undefined,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    selectStock: (state, action: PayloadAction<Stock>) => {
      state.selectedStock = action.payload;
    },
    unselectStock: (state) => {
      state.selectedStock = undefined;
    },
  },
});

export const { selectStock, unselectStock } = stockSlice.actions;

export const selectCurrentStock = (state: RootState) =>
  state.stock.selectedStock;

export default stockSlice.reducer;
