import { createSlice } from '@reduxjs/toolkit';

// Початковий стан фільтрів
const initialState = {
  price: null,
  category: null,
  subcategory: null,
  is_on_sale: false,
  spec: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
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
      state.spec = action.payload;
    },
    resetFilters: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setPrice, setCategory, setSubcategory, setIsOnSale, setSpec, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
