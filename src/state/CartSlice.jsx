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
        itemInCart.totalPricePerItem = '$' + parseInt(action.payload.cost.slice(1) * itemInCart.quantity);
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPricePerItem: action.payload.cost,
        });
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.name === action.payload.name);
      state.cart.splice(itemIndex, 1);
    },
    updateQuantity: (state, action) => {
      const itemToUpdate = state.cart.find((item) => item.name === action.payload.name);
      if (itemToUpdate) {
        itemToUpdate.quantity--;
        itemToUpdate.totalPricePerItem = '$' + (parseInt(itemToUpdate.totalPricePerItem.slice(1)) - parseInt(itemToUpdate.cost.slice(1)));
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
