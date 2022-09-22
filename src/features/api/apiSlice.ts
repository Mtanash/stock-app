import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mtanash-stock-api.herokuapp.com",
    credentials: "include",
  }),
  tagTypes: ["stocks", "items"],
  endpoints: () => ({}),
});
