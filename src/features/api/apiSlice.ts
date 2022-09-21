import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://stock-api-oooe.onrender.com",
  }),
  tagTypes: ["stocks", "items"],
  endpoints: () => ({}),
});
