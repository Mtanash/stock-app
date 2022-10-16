import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Item } from "./../../interfaces/index";

const initialState: { filteredItems: Item[] } = {
  filteredItems: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setFilteredItems: (state, action: PayloadAction<Item[]>) => {
      state.filteredItems = action.payload;
    },
  },
});

export const { setFilteredItems } = itemSlice.actions;

export const selectFilteredItems = (state: RootState) =>
  state.item.filteredItems;

export default itemSlice.reducer;
