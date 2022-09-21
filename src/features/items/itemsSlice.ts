import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types";

const initialState: { items: Item[] } = {
  items: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
});

export const {} = itemsSlice.actions;

export default itemsSlice.reducer;
