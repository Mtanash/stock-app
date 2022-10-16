import { Stock } from "../../interfaces";
import { Item } from "./../../interfaces/index";
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
    deleteStock: builder.mutation<void, string>({
      query: (stockId) => ({
        url: `/stocks/${stockId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stocks", "items"],
    }),
    getStockItems: builder.query({
      query: (stockId) => `/stocks/${stockId}/items`,
      transformResponse: (rawResult: { data: Item[] }) => {
        return rawResult.data;
      },
      providesTags: ["items"],
    }),
  }),
});

export const {
  useAddNewStockMutation,
  useGetAllStocksQuery,
  useDeleteStockMutation,
  useGetStockItemsQuery,
} = extendedApi;
