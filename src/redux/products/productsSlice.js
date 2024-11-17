import { createSlice } from '@reduxjs/toolkit';
import { fetchOneProduct, fetchProducts } from './productsOperations';

const initialState = {
  products: [],
  productsCount: 0,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.results;
        state.productsCount = payload.count;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload }) => {
        console.log('payload: ', payload);
        state.isLoading = false;
        state.products = [payload];
      })
      .addCase(fetchOneProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default productsSlice;
