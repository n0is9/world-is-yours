import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '../../api/api';

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async ({ page_size, page, queryString }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(
        `/api/products/?page_size=${page_size}&page=${page}${queryString}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchOneProduct = createAsyncThunk(
  'fetchOneProduct',
  async (idNum, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/api/products/${idNum}/`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
