import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLocale, setLanguage } from '@redux/localeSlice';
import { updateUser } from '@redux/userSlice';
import { setWishlist } from '@redux/wishlistSlice';
import { addItemsCart } from '@redux/cartSlice';
import { $api, api2 } from '@api/api';

import MainPage from '@pages/MainPage.jsx';
import Footer from '@common/Footer';
import Header from '@common/Header';
import Loader from '@common/Loader';
import Profile from '@pages/Profile';
import Cart from '@pages/Cart';
import ProductPage from '@pages/ProductPage';
import Contacts from '@pages/Contacts';
import Favorites from '@pages/Favorites';

const PaymentPage = lazy(() => import('@pages/PaymentPage'));
const InfoPayment = lazy(() => import('@pages/InfoHelp'));
const NotFound404 = lazy(() => import('@pages/NotFound404'));
const CategoryPage = lazy(() => import('@pages/CategoryPage'));
const PasswordRecovery = lazy(() => import('@pages/PasswordRecovery'));

function App() {
  const dispatch = useDispatch();

  const [isLanguagueLoad, setLanguagueLoad] = useState(false);
  // language switcher
  const availableLanguages = useMemo(() => ['en', 'uk'], []);

  useEffect(() => {
    const userLanguages = navigator.languages || [
      navigator.language || navigator.userLanguage,
    ];
    const preferredLanguage = userLanguages.find((language) =>
      availableLanguages.includes(language),
    );

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
        try {
          // Попередньо перевіряємо, чи це дійсно JSON
          const cookieValue = parts.pop().split(';').shift();

          return cookieValue
            ? JSON.parse(decodeURIComponent(cookieValue))
            : null;
        } catch (e) {
          console.error('Error parsing cookie:', e);

          return null;
        }
      }

      return null; // Якщо cookie не знайдено
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

          <Route path='/payment/' element={<PaymentPage />} />

          <Route path='/info-help' element={<InfoPayment />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route
            path='/password_reset/:email/:code'
            element={<PasswordRecovery />}
          />
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
