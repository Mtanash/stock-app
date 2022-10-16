import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../features/api/apiSlice";
import itemReducer from "../features/item/itemSlice";
import stockReducer from "../features/stock/stockSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    user: userReducer,
    item: itemReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
