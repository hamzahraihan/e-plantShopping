import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './state/CartSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;
