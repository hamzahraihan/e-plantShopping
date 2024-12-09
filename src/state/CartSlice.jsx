/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.cart.find((item) => item.name == action.payload.name);
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.totalPricePerItem = parseInt(action.payload.cost.slice(1) * itemInCart.quantity);
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPricePerItem: action.payload.cost,
        });
      }
    },
    removeItem: (state, action) => {},
    updateQuantity: (state, action) => {},
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
