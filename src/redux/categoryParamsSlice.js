import { createSlice } from '@reduxjs/toolkit';

// Початковий стан фільтрів
const initialState = {
  price: null,
  ordering: false,
  category: null,
  subcategory: null,
  is_on_sale: false,
  spec: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    setIsOnSale: (state, action) => {
      state.is_on_sale = action.payload;
    },
    setSpec: (state, action) => {
      const key = Object.keys(action.payload)[0];
      const value = action.payload[key];

      if (value === null || value === undefined) {
        delete state.spec[key];
      } else {
        state.spec = { ...state.spec, ...action.payload };
      }
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPrice,
  setOrdering,
  setCategory,
  setSubcategory,
  setIsOnSale,
  setSpec,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
