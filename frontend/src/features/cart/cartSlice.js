import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiSlice} from '../api/apiSlice';

const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  estimatedTotal: 0,
  discount: 0,
  isExpanded: false,
  isLoading: false,
};

export const updateItemsAsync = createAsyncThunk(
  'cart/updateItemsAsync',
  async ({product, quantity}, {getState, dispatch}) => {
    if (getState().user.isAuthenticated) {
      const response = await dispatch(
        apiSlice.endpoints.updateCart.initiate({
          productId: product._id,
          quantity: quantity,
        })
      );
      dispatch(updateCart(response.data.cart));
      return response.data.cart;
    }
    dispatch(updateItems({product, quantity}));
  }
);

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (_, {dispatch}) => {
    const response = await dispatch(apiSlice.endpoints.fetchCart.initiate());
    dispatch(updateCart(response.data));
    return response.data.cart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, _) => {
      state.isExpanded = !state.isExpanded;
    },
    closeCart: (state, _) => {
      state.isExpanded = false;
    },
    updateCart: (state, action) => {
      const updates = action.payload;
      state.items = updates.items;
      state.subtotal = updates.subtotal;
      state.tax = updates.tax;
      state.estimatedTotal = updates.estimatedTotal;
      state.discount = updates.discount;
    },
    clearCart: (state, _) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.estimatedTotal = 0;
      state.discount = 0;
    },
    updateItems: (state, action) => {
      const {product, quantity} = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      const quantityDiff = quantity - (existingItem?.quantity ?? 0);
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.items.push({product, quantity});
      }
      state.items.subtotal += quantityDiff * product.price;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateItemsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {toggleCart, closeCart, updateCart, clearCart, updateItems} =
  cartSlice.actions;
export default cartSlice;
