import axios from 'axios';
import config from '../config/config';

// const BASE_URL = 'http://localhost:8000';

const api2 = {
  // language switch
  getLanguage: async (code) => {
    try {
      const response = await axios.get(`/api/language/${code}/`);
      return response.data;
    } catch (error) {
      // console.error('Error fetching posts:', error);
      throw error;
    }
  },

  signUp: async (userData) => {
    try {
      const response = await axios.post(`/api/users/`, userData);
      // console.log('signUp success.  status:', response.status);

      return response;
    } catch (error) {
      console.log('Error registering user in api:', error);
      throw error;
    }
  },

  signIn: async (userData) => {
    try {
      const response = await axios.post(`/api/auth/`, {
        username: userData.email,
        password: userData.password,
      });
      // console.log('signIn success  status:', response.status);
      return response;
    } catch (error) {
      console.error('Error login user in api:', error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.patch(`/api/users/${userData.user_id}/`, userData);

      return response;
    } catch (error) {
      console.log('Error updating user in api:', error);
      throw error;
    }
  },

  socialLogin: async (idToken) => {
    try {
      const response = await axios.post(`/api/auth/social-login`, { idToken });
      // console.log('socialLogin success:', response);
      return response;
    } catch (error) {
      console.error('Error during social login in api:', error);
      throw error;
    }
  },

  resetPassword: async (userData) => {
    try {
      const response = await axios.post(`/api/password_reset/`, userData);
      return response;
    } catch (error) {
      // console.error('Error registering user in api:', error);
      throw error;
    }
  },
};

const $api = axios.create({
  // baseURL: config.BASE_URL,
});

$api.interceptors.request.use(
  (config) => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
      }
    }
    const user = getCookie('user');
    if (user) {
      const token = user.token;
      if (token) {
        config.headers['Authorization'] = `Token ${token}`;
        //  config.headers["Authorization"] = `Bearer ${token}`;
        console.log('Token added to request:', token);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized error: Access is denied due to invalid credentials.');
    }
    return Promise.reject(error);
  },
);

export { api2, $api };
