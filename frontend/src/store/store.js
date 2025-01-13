import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../features/api/apiSlice';
import userSlice from '../features/user/userSlice';
import cartSlice from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
