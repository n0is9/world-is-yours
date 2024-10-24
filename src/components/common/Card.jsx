import React, { useEffect, useState } from 'react';
import HeartIcon from '../../assets/icons/icon-heart.svg';
import HeartIconRed from '../../assets/icons/icon-heart-red.svg';
import Button from './Button';
import Cart from '../../assets/icons/dark/icon-cart-dark.svg';
import CartFull from '../../assets/icons/dark/icon-cart-dark-full.svg';
import { $api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../redux/wishlistSlice';
import { addItemCart, removeItemCart } from '../../redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavLink } from 'react-router-dom';

import { motion as m } from 'framer-motion';

const Card = ({ data }) => {
  const dispatch = useDispatch();

  const [isLiked, setLike] = useState(false);
  const [isCart, setCart] = useState('');

  const wishlist = useSelector((state) => state.wishlist.items);

  const cart = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (wishlist.includes(data.id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [data, wishlist]);

  useEffect(() => {
    setCart(cart.find((item) => item.product === data.id));
  }, [data, cart]);

  const toggleWishList = async () => {
    if (!isAuthenticated) {
      toast.info('This action is available to registered users only', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      if (!isLiked) {
        await $api.post(`/api/wishlist/`, { product: data.id });
        dispatch(addItem(data.id));
      } else {
        await $api.delete(`/api/wishlist/${data.id}/`);
        dispatch(removeItem(data.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCart = async () => {
    if (!isAuthenticated) {
      toast.info('This action is available to registered users only', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      if (!isCart) {
        const response = await $api.post(`/api/baskets/`, { product: data.id });
        dispatch(addItemCart(response.data));

        console.log(response.data);
      } else {
        const response = await $api.delete(`/api/baskets/${isCart.id}/`);
        dispatch(removeItemCart(data.id));

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <m.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='relative'
    >
      <ToastContainer />
      <div
        className='absolute top-3 right-3 m-2 z-10'
        onClick={() => toggleWishList()}
      >
        <img
          src={isLiked ? HeartIconRed : HeartIcon}
          alt='heart icon'
          width='36'
          className='cursor-pointer'
        />
      </div>

      <NavLink
        to={`/product/${data.id}`}
        className='block border border-[#888888] rounded-2xl relative overflow-hidden h-full items-center z-0'
      >
        <div className='flex justify-center overflow-hidden'>
          <img
            src={data.image_1}
            alt={data.name}
            className='w-full h-96 object-cover cursor-pointer'
          />
        </div>

        <div className='p-5 pr-[120px]'>
          <p className='text-custom-black font-semibold'>{data.name}</p>
          <p className='text-custom-black'>{data.price}</p>
        </div>
      </NavLink>

      <Button
        classNameBtn={`absolute bottom-3 right-3 z-10 flex border rounded-md py-3 px-3 duration-300 hover:border-blue focus:border-blue ${isCart ? ' bg-black' : ''}`}
        onClickBtn={() => toggleCart()}
      >
        <img src={isCart ? CartFull : Cart} alt='cart' />
      </Button>
    </m.div>
  );
};

export default Card;
