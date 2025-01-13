import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // products-related
    fetchProducts: builder.query({
      query: ({page = 1, limit = 10, orderBy, order, searchStr}) => {
        const params = new URLSearchParams({
          page,
          limit,
          ...(orderBy && {orderBy}),
          ...(order && {order}),
          ...(searchStr && {searchStr}),
        });
        return `products?${params.toString()}`;
      },
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id, ...updatedProduct}) => ({
        url: `producuts/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `producuts/${id}`,
        method: 'DELETE',
      }),
    }),

    // cart-related
    fetchCart: builder.query({
      query: () => ({
        url: '/cart',
      }),
    }),
    updateCart: builder.mutation({
      query: ({productId, quantity}) => ({
        url: 'cart',
        method: 'PATCH',
        body: {productId, quantity},
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart',
        method: 'DELETE',
      }),
    }),
    mergeCart: builder.mutation({
      query: (products) => ({
        url: 'cart/merge',
        method: 'PATCH',
        body: {products},
      }),
    }),
    applyDiscount: builder.mutation({
      query: (code) => ({
        url: 'cart/discount',
        method: 'PUT',
        body: {code},
      }),
    }),
    checkout: builder.mutation({
      query: () => ({
        url: 'cart/checkout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  useFetchCartQuery,
  useUpdateCartMutation,
  useClearCartMutation,
  useMergeCartMutation,
  useApplyDiscountMutation,
  useCheckoutMutation,
} = apiSlice;
