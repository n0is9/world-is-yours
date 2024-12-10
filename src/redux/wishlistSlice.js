import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const id = action.payload;
      if (!state.items.includes(id)) {
        state.items.push(id);
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item !== id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { setWishlist, addItem, removeItem, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
