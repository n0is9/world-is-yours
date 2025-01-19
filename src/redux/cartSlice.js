/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Масив товарів у корзині
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Додавання одного товару в корзину
    addItemCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product === action.payload.product,
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Adding an array of products to the cart
    addItemsCart: (state, action) => {
      action.payload.forEach((newItem) => {
        const existingItem = state.items.find((item) => item.product === newItem.product);

        if (existingItem) {
          existingItem.quantity += newItem.quantity || 1;
        } else {
          state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
        }
      });
    },
    // Remove an item from the basket
    removeItemCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Update the quantity of goods in the basket
    updateQuantityCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === product);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    // Empty the bin
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemCart, addItemsCart, removeItemCart, updateQuantityCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
