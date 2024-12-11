import { createSlice } from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    language: '',
    locale: 'uk',
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload.locale;
    },
    setLanguage: (state, action) => {
      if (action.payload && action.payload.language) {
        state.language = action.payload.language;
      }
    },
  },
});

// Експорт екшенів та редюсера
export const { setLocale, setLanguage } = localeSlice.actions;
export default localeSlice.reducer;
