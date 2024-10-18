import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import MainPage from './pages/MainPage';
// import PaymentPage from "./pages/PaymentPage";
// import NotFound404 from "./pages/NotFound404";
// import InfoPayment from "./pages/InfoHelp";
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, setLanguage } from './redux/localeSlice';
import { $api, api2 } from './api/api';
import Footer from './components/common/Footer';

import Header from './components/common/Header';
import Loader from './components/common/Loader';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import PasswordRecovery from './pages/PasswordRecovery';
import ProductPage from './pages/ProductPage';
import Contacts from './pages/Contacts';
import CategoryPage from './pages/CategoryPage';
import { updateUser } from './redux/userSlice';
import { setWishlist } from './redux/wishlistSlice';
import { addItemsCart } from './redux/cartSlice';
import Favorites from './pages/Favorites';


const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const InfoPayment = lazy(() => import('./pages/InfoHelp'));
const NotFound404 = lazy(() => import('./pages/NotFound404'));

function App() {
  const dispatch = useDispatch();

  const [isLanguagueLoad, setLanguagueLoad] = useState(false);
  // language switcher
  const availableLanguages = useMemo(() => ['en', 'uk'], []);

  useEffect(() => {
    const userLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
    const preferredLanguage = userLanguages.find((language) => availableLanguages.includes(language));

    const selectedLanguage = preferredLanguage || 'en'; //default

    dispatch(setLocale({ locale: selectedLanguage }));

    // Викликаємо getLanguage
  }, [availableLanguages, dispatch]);

  const locale = useSelector((state) => state.locale.locale);
  useEffect(() => {
    const getLanguage = async () => {
      try {
        const data = await api2.getLanguage(locale);
        dispatch(setLanguage({ language: data }));
        console.log(data);
        setLanguagueLoad(true);
      } catch (error) {
        console.error('Error in useTranslation:', error);

        setTimeout(() => {
          setLanguagueLoad(true);
          console.log('here use effect error');
        }, 2000);
      }
    };
    getLanguage();
  }, [locale, dispatch]);

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
      }
    }

    // init user cart and wishlist
    const user = getCookie('user');
    if (user) {
      if (user && typeof user === 'object') {
        const getWishlist = async () => {
          try {
            const response = await $api.get('/api/wishlist/');
            const productIds = response.data.map((item) => item.product);
            dispatch(setWishlist(productIds));

            dispatch(updateUser(user));
          } catch (error) {
            console.error('Failed to fetch wishlist:', error);
          }
        };
        getWishlist();

        const getCart = async () => {
          try {
            const response = await $api.get('/api/baskets/');
            const cartItems = response.data.map((item) => ({
              id: item.id,
              product: item.product,
              quantity: item.quantity,
            }));
            dispatch(addItemsCart(cartItems)); // Переконайтесь, що це правильна назва вашої дії
          } catch (error) {
            console.error('Failed to fetch cart:', error);
          }
        };
        getCart();
      }
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {isLanguagueLoad ? null : <Loader />}
      <Header />
      <main>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/password-recovery' element={<PasswordRecovery />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/info-help' element={<InfoPayment />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </main>
      <Footer />
      
    </Suspense>
    
  );
}

export default App;
