// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import localeReducer from './localeSlice';
import headerReducer from './headerSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice';
import filtersReducer from './categoryParamsSlice';

const store = configureStore({
  reducer: {
    locale: localeReducer,
    header: headerReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    categoryFilter: filtersReducer,
    // тут можна додати інші reducers за необхідності
  },
});

export default store;
