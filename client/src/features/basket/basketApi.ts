import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, Item } from "../../app/models/basket";
import { Product } from "../../app/models/product";

export const basketApi = createApi({
  reducerPath: "basketApi",
  tagTypes: ["Basket"],
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product; quantity: number }
    >({
      query: ({ product, quantity }) => ({
        url: "basket",
        params: { productId: product.id, quantity },
        method: "POST",
      }),
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        //Optimistic update
        // 1. Update the basket in the cache
        // 2. Update the basket in the database
        // 3. Invalidate the basket cache
        // 4. Rollback the optimistic update if the database call fails
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const existingItem = draft.items.find(
              (item) => item.productId === product.id
            );

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              draft.items.push(new Item(product, quantity));
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "basket",
        params: { productId, quantity },
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );

            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
            }
            if (draft.items[itemIndex].quantity === 0) {
              draft.items.splice(itemIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
