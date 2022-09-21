import { Item, Date } from "../../types";
import { apiSlice } from "./apiSlice";

type ItemType = {
  stock: string;
  name: string;
  date: { month: number; year: number };
  quantity: number;
};

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<Item[], string | undefined>({
      query: (stockId) => `/items?stock=${stockId}`,
      transformResponse: (rawResult: { data: Item[] }) => {
        return rawResult.data;
      },
      providesTags: ["items"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (itemId) => ({
        url: `items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["items", "stocks"],
    }),
    addNewDate: builder.mutation<void, { date: Date; itemId: string }>({
      query: ({ date, itemId }) => ({
        url: `items/${itemId}`,
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["items", "stocks"],
    }),
    editItem: builder.mutation<void, { newName: string; itemId: string }>({
      query: ({ newName, itemId }) => ({
        url: `items/${itemId}`,
        method: "PATCH",
        body: { name: newName },
      }),
      invalidatesTags: ["items", "stocks"],
    }),
    addNewItem: builder.mutation<void, ItemType>({
      query: (item) => ({
        url: "/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["items", "stocks"],
    }),
    deleteItemDate: builder.mutation<void, { itemId: string; dateId: string }>({
      query: ({ itemId, dateId }) => ({
        url: `items/${itemId}/${dateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["items", "stocks"],
    }),
    updateItemDateQuantity: builder.mutation<
      void,
      { itemId: string; dateId: string; quantity: number }
    >({
      query: ({ itemId, dateId, quantity }) => ({
        url: `items/${itemId}/${dateId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["items", "stocks"],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useAddNewDateMutation,
  useDeleteItemMutation,
  useEditItemMutation,
  useAddNewItemMutation,
  useDeleteItemDateMutation,
  useUpdateItemDateQuantityMutation,
} = extendedApi;
