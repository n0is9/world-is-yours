import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'hader',
  initialState: {
    isCategoriesOpen: false,
  },
  reducers: {
    setIsCategoriesOpen: (state, action) => {
      state.isCategoriesOpen = action.payload.isCategoriesOpen;
    },
  },
});

// Експорт екшенів та редюсера
export const { setIsCategoriesOpen } = headerSlice.actions;
export default headerSlice.reducer;
