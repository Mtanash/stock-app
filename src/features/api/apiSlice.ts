import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./../../app/store";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mtanash-stock-api.herokuapp.com",
    credentials: "include",
    prepareHeaders(headers, { getState }) {
      const accessToken = (getState() as RootState).user.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["stocks", "items"],
  endpoints: () => ({}),
});
