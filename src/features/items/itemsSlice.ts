import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../interfaces";

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
