import { Stock } from "../../types";
import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewStock: builder.mutation<void, { name: string }>({
      query: (stock) => ({
        url: "/stocks",
        method: "POST",
        body: stock,
      }),
      invalidatesTags: ["stocks"],
    }),
    getAllStocks: builder.query<Stock[], null>({
      query: () => "/stocks",
      transformResponse: (rawResult: { data: Stock[] }) => {
        return rawResult.data;
      },
      providesTags: ["stocks"],
    }),
  }),
});

export const { useAddNewStockMutation, useGetAllStocksQuery } = extendedApi;
