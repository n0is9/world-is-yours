import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    token: null,
    user_id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    address: {
      id: null,
      address_line: null,
      city: null,
      country: null,
      zip_code: null,
    },
    date_of_birth: null,
    is_verified_email: false,
    image: null,
    is_superuser: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
